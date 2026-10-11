const isChinese = document.documentElement.lang === 'zh'
const systemTheme = matchMedia('(prefers-color-scheme: dark)')

systemTheme.addEventListener('change', ({ matches }) => {
  if (document.documentElement.dataset.themePreference === 'system') {
    document.documentElement.dataset.theme = matches ? 'dark' : 'light'
  }
})

document.querySelectorAll('time[data-date]').forEach((time) => {
  const date = new Date(time.dataset.date)
  if (Number.isNaN(date.getTime())) return
  time.dateTime = date.toISOString()
  time.textContent = new Intl.DateTimeFormat(isChinese ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
})
