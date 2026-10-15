export type Language = 'en' | 'zh'

export function localizedPath(path: string, language: Language): string {
  if (path === '/archive/') return path
  return language === 'zh' ? `/zh${path}` : path
}

export function otherLanguage(language: Language): Language {
  return language === 'en' ? 'zh' : 'en'
}

export function getStaticAlternate(
  path: string,
  language: Language,
): string | undefined {
  const unprefixed =
    language === 'zh' ? path.replace(/^\/zh(?=\/|$)/, '') || '/' : path
  const normalized = `${unprefixed.replace(/\/$/, '')}/`
  if (!['/', '/blog/', '/projects/', '/moments/'].includes(normalized))
    return undefined
  return localizedPath(normalized, otherLanguage(language))
}

export function getLanguageFallback(path: string, language: Language): string {
  const target = otherLanguage(language)
  if (/^\/(?:zh\/)?blog\//.test(path)) return localizedPath('/blog/', target)
  if (/^\/(?:zh\/)?projects\//.test(path))
    return localizedPath('/projects/', target)
  return localizedPath('/', target)
}

export const ui = {
  en: {
    languageSwitch: {
      label: 'Language',
      en: 'Switch to English',
      zh: 'Switch to Chinese',
      home: 'View the Chinese homepage',
      blog: 'View the Chinese blog',
      projects: 'View the Chinese projects',
    },
    blog: {
      title: 'Blog',
      heading: 'Code, words, and',
      emphasis: 'everyday life.',
      date: 'Date',
      tags: 'Tags',
      project: 'Project',
      words: 'Words',
      length: 'Length',
      minutes: 'min',
      readNext: 'Read next',
      actions: {
        label: 'Article actions',
        like: 'Like',
        liked: 'Liked',
        share: 'Share',
        copyLink: 'Copy link',
        shareX: 'Share on X',
        shareBluesky: 'Share on Bluesky',
        systemShare: 'More options…',
        copied: 'Link copied',
        copyFailed: 'Select and copy the link below.',
        link: 'Article link',
        shareEmail: 'Share by email',
      },
      description:
        'Notes on programming, open source, books, travel, and everyday life.',
    },
    projects: {
      title: 'Projects',
      heading: 'Open source,',
      emphasis: 'and products.',
      description:
        'Open source projects and independent products I build and maintain.',
      empty: 'Projects will appear here when they are published.',
      categories: { 'Open Source': 'Open Source', 'Web App': 'Web App' },
      category: 'Category',
      since: 'Since',
      website: 'Website',
      repository: 'Repository',
      related: 'Related writing',
      relatedLead:
        'Decisions, implementation notes, and lessons from the work.',
      allWriting: 'View all writing →',
    },
    archive: {
      title: 'Archive',
      description: 'Earlier writing in English and Chinese.',
    },
    moments: {
      title: 'Moments',
      description: 'Photographs from travels and everyday life.',
    },
    sponsors: {
      title: 'Sponsors',
      description:
        'Thank you to the people and organizations who support my open source work.',
      becomeSponsor: 'Become a sponsor',
      gold: 'Gold Sponsors',
      silver: 'Silver Sponsors',
      sponsors: 'Sponsors',
      backers: 'Backers',
      supporter: 'Supporter',
      past: 'Past sponsors',
      organization: 'Organization',
    },
    emptyWriting: 'New writing will appear here.',
    earlierWriting: 'Read earlier posts in the archive.',
    pagination: {
      label: 'Blog pagination',
      previous: '← Previous',
      next: 'Next →',
      page: 'Page',
      of: 'of',
    },
  },
  zh: {
    languageSwitch: {
      label: '语言',
      en: '切换到英文',
      zh: '切换到中文',
      home: '查看英文首页',
      blog: '查看英文博客',
      projects: '查看英文项目',
    },
    blog: {
      title: '博客',
      heading: '代码、文字，',
      emphasis: '与日常生活。',
      date: '日期',
      tags: '标签',
      project: '项目',
      words: '字数',
      length: '阅读时间',
      minutes: '分钟',
      readNext: '继续阅读',
      actions: {
        label: '文章操作',
        like: '赞',
        liked: '已赞',
        share: '分享',
        copyLink: '复制链接',
        shareX: '分享到 X',
        shareBluesky: '分享到 Bluesky',
        systemShare: '更多方式…',
        copied: '链接已复制',
        copyFailed: '请复制下方的链接。',
        link: '文章链接',
        shareEmail: '通过邮件分享',
      },
      description: '关于编程、开源、阅读、旅行与日常生活的记录。',
    },
    projects: {
      title: '项目',
      heading: '开源项目，',
      emphasis: '与独立产品。',
      description: '我正在开发和维护的开源项目与独立产品。',
      empty: '项目发布后会显示在这里。',
      categories: { 'Open Source': '开源', 'Web App': 'Web 应用' },
      category: '分类',
      since: '始于',
      website: '网站',
      repository: '代码仓库',
      related: '相关文章',
      relatedLead: '项目中的设计决策、实现细节与经验。',
      allWriting: '查看全部文章 →',
    },
    archive: { title: '归档', description: '以前写过的中文和英文文章。' },
    moments: { title: '瞬间', description: '旅行与日常生活中的照片。' },
    sponsors: {
      title: '赞助',
      description: '感谢支持我开源工作的个人与组织。',
      becomeSponsor: '成为赞助者',
      gold: '黄金赞助商',
      silver: '白银赞助商',
      sponsors: '赞助商',
      backers: '赞助者',
      supporter: '支持者',
      past: '曾经的赞助者',
      organization: '组织',
    },
    emptyWriting: '新文章发布后会显示在这里。',
    earlierWriting: '在归档中阅读以前的文章。',
    pagination: {
      label: '博客分页',
      previous: '← 上一页',
      next: '下一页 →',
      page: '第',
      of: '/',
    },
  },
} as const
