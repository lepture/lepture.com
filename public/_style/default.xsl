<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  exclude-result-prefixes="atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  <xsl:variable name="chinese" select="/rss/channel/language = 'zh'" />
  <xsl:template match="/">
    <html data-theme="light" data-theme-preference="system">
      <xsl:attribute name="lang">
        <xsl:choose><xsl:when test="$chinese">zh</xsl:when><xsl:otherwise>en</xsl:otherwise></xsl:choose>
      </xsl:attribute>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title><xsl:value-of select="/rss/channel/title" /> — RSS</title>
        <link rel="icon" type="image/jpeg" href="{/rss/channel/image/url}" />
        <link rel="stylesheet" href="/_style/feed.css" />
        <script><![CDATA[
          let themePreference = 'system';
          try {
            const savedTheme = localStorage.getItem('aster-theme');
            if (savedTheme === 'dark' || savedTheme === 'light') themePreference = savedTheme;
          } catch {}
          document.documentElement.dataset.themePreference = themePreference;
          document.documentElement.dataset.theme = themePreference === 'system'
            ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : themePreference;
        ]]></script>
        <script src="/_style/feed.js" defer="defer"></script>
      </head>
      <body>
        <header class="site-header">
          <a class="brand" href="{/rss/channel/link}">
            <span><xsl:value-of select="/rss/channel/image/title" /></span>
          </a>
          <div class="header-actions">
            <a href="{/rss/channel/link}">
              <xsl:choose><xsl:when test="$chinese">返回网站</xsl:when><xsl:otherwise>Back to site</xsl:otherwise></xsl:choose>
              <span aria-hidden="true"> &#x2197;</span>
            </a>
          </div>
        </header>
        <main>
          <section class="intro" aria-labelledby="feed-title">
            <p class="eyebrow">RSS · <xsl:value-of select="count(/rss/channel/item)" />
              <xsl:choose><xsl:when test="$chinese"> 条内容</xsl:when><xsl:otherwise> entries</xsl:otherwise></xsl:choose>
            </p>
            <h1 id="feed-title"><xsl:value-of select="/rss/channel/title" /></h1>
            <p class="description"><xsl:value-of select="/rss/channel/description" /></p>
            <div class="subscribe">
              <p><xsl:choose>
                <xsl:when test="$chinese">将此地址添加到 RSS 阅读器，即可订阅更新。</xsl:when>
                <xsl:otherwise>Add this URL to your RSS reader to follow new posts.</xsl:otherwise>
              </xsl:choose></p>
              <code><xsl:value-of select="/rss/channel/atom:link[@rel='self']/@href" /></code>
            </div>
          </section>
          <section aria-labelledby="entries-title">
            <h2 class="section-title" id="entries-title">
              <xsl:choose><xsl:when test="$chinese">最新内容</xsl:when><xsl:otherwise>Latest entries</xsl:otherwise></xsl:choose>
            </h2>
            <ol class="entries">
              <xsl:for-each select="/rss/channel/item">
                <li>
                  <article>
                    <time data-date="{pubDate}"><xsl:value-of select="pubDate" /></time>
                    <div>
                      <h3><a href="{link}"><xsl:value-of select="title" /><span class="arrow" aria-hidden="true"> &#x2197;</span></a></h3>
                      <xsl:if test="description"><p><xsl:value-of select="description" /></p></xsl:if>
                    </div>
                  </article>
                </li>
              </xsl:for-each>
            </ol>
            <xsl:if test="not(/rss/channel/item)">
              <p class="description"><xsl:choose><xsl:when test="$chinese">这里还没有内容。</xsl:when><xsl:otherwise>No entries yet.</xsl:otherwise></xsl:choose></p>
            </xsl:if>
          </section>
        </main>
        <footer>Powered by <a href="https://prosefly.com">Prosefly</a></footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
