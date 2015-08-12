# 前端的基礎修養：aria-label

- date: 2015-08-12 21:40
- tags: fe-basic, wai-aria

aria-label 是一個 HTML attribute，用來告訴讀屏軟件某個元素是什麼，提升 Web Accessibility。

---

「前端的基礎修養」是我擬寫的一系列文章的總標題。所以喚作「修養」，大抵因為心虛，覺得沒有什麼技術含量，不便言之技術。這一系列會以亂序呈現，同一主題的文章會穿插出現。

這一篇談 Accessibility 相關的主題——aria-label 的使用。Accessibility 作為一個整體，是一個龐大而複雜的主題。這裡單講 aria-label，因其比較簡單與實用，作為切入點正合適。

可能有人不理解什麼是 Accessibility，這裡簡單解釋一下。比如地鐵有大通道方便輪椅通過，比如紅綠燈有聲音提示方便盲人通行，比如鼠標有左手模式方便習慣用左手的人使用。讓更廣泛（生理上有所不同）的人群可以使用，就是 Accessibility。

這個話題去歲在台灣談過，是參加 JSDC 2014 時講的，[不被重視的 HTML：Accessibility](/zh/2014/talk-on-accessibility-jsdc2014)。

## aria-label 初窺

aria-label 是一個 HTML attribute，用來告訴讀屏軟件某個元素是什麼。例如一個關閉按鈕「×」，視覺上看來都能理解，但是讀屏軟件並不能正確讀出，這時就可以用 `aria-label` 告訴它：

```html
<button aria-label="關閉">&times;</button>
```

讀屏軟件（比如說 Voice Over）就會讀出「按鈕，關閉」。圖片 `<img>` 的 `alt` 屬性亦有此效果，因為圖片本身是沒有辦法被讀出的，所以讀屏軟件會去閱讀 `alt` 的內容。

假如 `<img>` 標籤同時有 `aria-label` 與 `alt` 屬性，那麼讀屏軟件應該閱讀哪個的內容呢？答案當然是 `aria-label`。這裡需要明白 `alt` 本身還有另一個作用，當圖片無法加載時，瀏覽器會將 `alt` 的內容展示給用戶。

![alt 在各個瀏覽器里的顯示情況](//dn-lepture.qbox.me/blog/image-alt.jpg "alt 在各個瀏覽器里的顯示情況")


## aria-label 與 title

全局屬性 `title` 是用作提示與補充的，你認為讀屏軟件會識別 `title` 麼？完全不會，Voice Over[^vo]、JAWS[^jaws]、NVDA[^nvda] 都不會去識別，`title` 對於 Accessibility 毫無幫助。

```html
<a href="#" title="設置"><img src="gear.png"></a>
```

這段代碼是一個鏈接，使用一個圖片表示「設置」，使用 `title` 注釋。如果鼠標懸浮在鏈接上的話，會出現提示，但是讀屏軟件根本無法識別。你應該使用 `aria-label` 來代替 `title`:

```html
<a href="#" aria-label="設置"><img src="gear.png"></a>
```

## aria-label 與 iconfont

多數網站已經不使用圖片來表示 icon 了，轉而使用 iconfont 又或者 svg。無論是哪種方案，圖標都只是給視覺正常的人使用的。這個時候你需要使用 `arial-label` 來標注：

```html
<a href="#"><i class="icon-gear" aria-label="設置"></i></a>
<a href="#" aria-label="設置"><i class="icon-gear"></i></a>
```

上面的例子里給出了兩種方案，一是在圖標本身的標籤上，一是在鏈接 `<a>` 上，兩種方案讀屏軟件都能正確識別，但是個人以為放在鏈接 `<a>` 上比較好，比如鏈接里是圖標加文字說明的形式：

```html
<a href="#" aria-label="設置"><i class="icon-gear"></i> 設置</a>
```

這時便不能在 iconfont 上添加 `aria-label` 了，否則會念兩遍「設置」，但是這種情況更好的方法是使用 `aria-hidden`：

```html
<a href="#"><i class="icon-gear" aria-hidden="true"></i> 設置</a>
```

## aria-label 作為提示

但是許多時候，即使你能看清楚圖標，你也完全不知道那是個什麼鬼東西，圖標始終是一個抽象概念，並非人人都能理解。我們常會用 tooltip 作為提示，比如 [jquery.tipsy](http://onehackoranother.com/projects/jquery/tipsy/)。

jquery.tipsy 這個插件默認使用 `title` 作為數據來源，也可以使用其它屬性：

```js
$('#example-custom-attribute').tipsy({title: 'aria-label'});
```

GitHub 使用的純 CSS 方案不錯，使用 CSS `attr()` 獲取 arial-label 的內容作為提示，在不需要兼容老舊瀏覽器的情況下建議使用，整理代碼如下：

```css
.tip {
  position: relative;
}
.tip:before {
  display: none;
  position: absolute;
  top: auto;
  right: 50%;
  bottom: -7px;
  margin-right: -5px;
  width: 0;
  height: 0;
  content: '';
  border: 5px solid transparent;
  border-bottom-color: rgba(0, 0, 0, 0.9);
  pointer-events: none;
  z-index: 10000;
}
.tip:after {
  display: none;
  position: absolute;
  top: 100%;
  right: 50%;
  padding: 0 10px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.9);
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  content: attr(aria-label);
  white-space: pre;
  z-index: 10000;
  margin-top: 5px;
  line-height: 26px;
  transform: translateX(50%);
}
```

![GitHub aria-label 提示](//dn-lepture.qbox.me/blog/github-aria-label.png "GitHub 使用 aria-label 提示")


## aria-label 與表單

`placeholder` 的出現導致了大量不帶 `<label>` 的 form 表單，然而**讀屏軟件是不會識別 `placeholder`** 的。例如：

```html
<input name="username" placeholder="用戶名">
<input name="email" placeholder="郵箱">
```

對於視覺正常的人來說沒有問題，但是在讀屏軟件看來它只是兩個輸入框，至於需要輸入什麼，它是不知道的。這個時候你需要用 `aria-label` 再次標注：

```html
<input name="username" placeholder="用戶名" aria-label="用戶名">
<input name="email" placeholder="郵箱" aria-label="郵箱">
```

還有另外一種方案，使用 `<label>`，但是不顯示 `<label>`：

```html
<label for="username" class="sr-only">用戶名</label>
<input id="username" name="username" placeholder="用戶名">
```

使用 CSS 來隱藏 `.sr-only`(screen reader only) 這個 class 的標籤，注意不能使用 `display: none`，否則讀屏軟件會忽略，只在[視覺上將其隱藏](http://a11yproject.com/posts/how-to-hide-content/)即可。


## 索引

`aria-label` 理論上是作用於所有 tag 的，但是我實際測試下來，不支持 h(n) 例如 h1-h6。

* https://dev.opera.com/articles/ux-accessibility-aria-label/
* http://webaim.org/techniques/forms/advanced
* http://www.deque.com/blog/text-links-practices-screen-readers/
* http://www.w3.org/TR/2015/WD-aria-in-html-20150521/

[^vo]: Voice Over 是 Apple (Mac & iOS) 的讀屏軟件
[^jaws]: JAWS 是一個讀屏軟件，適用於 Windows
[^nvda]: NVDA 是一個開源讀屏軟件 http://www.nvaccess.org/