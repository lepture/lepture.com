# 長微博及其它

- date: 2013-11-12 22:34
- tags: idea, thought

長微博這個詞像警世的寓言，頗有一股諷刺意味，正好比我們說方方正正的圓圈，規規矩矩的放蕩。

-----

長微博這個詞像警世的寓言，頗有一股諷刺意味，正好比我們說方方正正的圓圈，規規矩矩的放蕩。

我微博用得不勤，話多在 Twitter。一方面是微博的界面入不得眼，另一方面就是文字圖片（所謂長微博者）的濫用。微博也意識到了這點，可是又不思進取，以爲提供一個官方的文字圖片生成工具就算是解決問題了。

前些時候，濟南中院微博直播薄熙來案庭審，算是開創性的大事吧。而文字直播所用的方式竟然是這長微博，也就是圖片。起先，濟南中院整理出純文本稿，而後將此文本生成圖片發表於微博，最後再由網易小編整理成純文本稿，不知花費人力幾何？信息量未變，而圖片在其傳播過程中又浪費網絡資源幾何？

我不知也。假使我有點情懷，也該矯情地說一句：「也請偶爾爲這個宇宙考慮考慮吧。」

## Twitter 的思路

批評有時顯得蒼白無力，需要一點建設性意見。我們也偶爾需要承認，外國的月亮確實要圓一點。看看 Twitter 是如何做的。

Twitter 有一個特性叫作 [Twitter Cards](https://dev.twitter.com/cards)，用來展示嵌入內容。它可以是摘要，可以是圖片，可以是視頻，還可以是 App。

當你發出一條包含網址的 Tweet 時，Twitter 會去查看該網址是否包含可展示的內容。具體的要求則是該網址包含 Twitter 所要求的標記。比如：

```html
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="長微博及其它">
<meta name="twitter:description" content="....">
```

然後向 Twitter 提交你的網站，待 Twitter 認證後，包含你網站的 Tweet 便會展示相關摘要了。請放心，這一步相當快，Twitter 的審覈在幾分鍾內就完成了。

## 標準的價值

Twitter 的方案並非原創，是模仿的 [Open Graph](http://ogp.me/)。這一方案的好處是顯而易見的，一種包羅萬象的大氣。所謂互聯網者，當互聯也，關起門來獨攬全活叫自閉而非互聯。而協議就是這互聯的基礎。

Open Graph 是由臉書提出的，Twitter 繼承而生 Twitter Cards，而 [Google+](https://developers.google.com/+/web/snippet/) 兼而得之。

尤其值得一提的是 [Schema](http://schema.org/) 標準，真正有一股描述世界的霸氣：

```html
<body itemscope itemtype="http://schema.org/Product">
  <h1 itemprop="name">Shiny Trinket</h1>
  <img itemprop="image" src="{image-url}" />
  <p itemprop="description">Shiny trinkets are shiny.</p>
</body>
```

標準需要的不一定是技術，有時只是一個想法就足夠了。比如說 RSS、Atom。

## 對微博建議

文字圖片的弊端也不再述了，我也知道中國人的獨特需求，他們喜歡被圈養，不太願意跳出圍城。但是這並不意味着我們就需要污染環境。

正如 Twitter 模仿 Open Graph，我們也可以模仿 Schema：

```html
<div itemscope itemtype="http://weibo.com/LongWeibo">
  <meta name="creator" content="@lepture">
  <h1 itemprop="name">Article Title</h1>
  <img itemprop="image" src="{image-url}" />
  <p itemprop="description">Shiny trinkets are shiny.</p>
  <div itemprop="content">
    {content}
  </div>
</div>
```

當我們分享一條鏈接時，微博便去索引此篇文章，找到全文內容，儲存爲純文本，在需要的時候展示全文。

這個想法是免費的，隨時歡迎微博取用。也衷心希望對這個世界溫柔一點，儘量使用更低能耗的純文本。珍愛世界，從我做起，如果你的郵箱簽名帶有圖片，請把圖片去掉。
