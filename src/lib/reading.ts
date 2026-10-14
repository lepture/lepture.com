import { decodeHTML } from 'entities'
import { parse, ELEMENT_NODE, TEXT_NODE, type Node } from 'ultrahtml'
import type { Language } from './i18n'

const blockElements = new Set([
  'article',
  'blockquote',
  'br',
  'div',
  'figcaption',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'li',
  'p',
  'pre',
  'section',
  'td',
  'th',
  'tr',
])
const readingSpeed = { en: 200, zh: 300 }

function getText(node: Node): string {
  if (node.type === TEXT_NODE) return decodeHTML(node.value)
  if (node.type === ELEMENT_NODE) {
    if (
      ['script', 'style', 'template', 'svg', 'button'].includes(node.name) ||
      'hidden' in node.attributes ||
      node.attributes['aria-hidden'] === 'true'
    )
      return ''
  }
  if (!('children' in node)) return ''
  const text = node.children.map(getText).join('')
  return node.type === ELEMENT_NODE && blockElements.has(node.name)
    ? ` ${text} `
    : text
}

export function getReadingStats(html: string, language: Language) {
  const text = getText(parse(html))
  const count =
    language === 'zh'
      ? (text.match(/[\p{L}\p{N}]/gu) ?? []).length
      : Array.from(
          new Intl.Segmenter('en', { granularity: 'word' }).segment(text),
        ).filter(({ isWordLike }) => isWordLike).length

  return { count, minutes: Math.ceil(count / readingSpeed[language]) }
}

function findParagraph(node: Node): string | undefined {
  if (node.type === ELEMENT_NODE) {
    if (
      [
        'script',
        'style',
        'template',
        'svg',
        'pre',
        'blockquote',
        'figure',
        'ul',
        'ol',
        'aside',
      ].includes(node.name) ||
      'hidden' in node.attributes ||
      node.attributes['aria-hidden'] === 'true'
    )
      return undefined
    if (node.name === 'p') {
      const text = getText(node).replace(/\s+/g, ' ').trim()
      if (text) return text
    }
  }
  if ('children' in node) {
    for (const child of node.children) {
      const paragraph = findParagraph(child)
      if (paragraph) return paragraph
    }
  }
  return undefined
}

export function getFirstParagraph(html: string): string | undefined {
  const paragraph = findParagraph(parse(html))
  if (!paragraph) return undefined
  const characters = Array.from(paragraph)
  if (characters.length <= 200) return paragraph
  const excerpt = characters.slice(0, 200).join('')
  const wordEnd = excerpt.lastIndexOf(' ')
  return `${(wordEnd >= 160 ? excerpt.slice(0, wordEnd) : excerpt).trimEnd()}…`
}
