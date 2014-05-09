# 適合閱讀的中文字體

- date: 2014-05-09 15:35
- tags: typography, web
- github: lepture/yue.css

關於中文字體的一點個人淺見，尋找適合 Web 閱讀的中文字體。

----

我時常更新自己的博客程序，也時常更新自己的博客主題。偏右言：「世上有兩種前端工程師，寫博客的，和寫博客的。」我之謂也。我的博客主題一直保持着簡潔的樣式，保持着我認爲適合閱讀的文字排版。

中文閱讀上，我以爲最大的問題便是字體。不像英文，使用 Web Fonts 的代價相當低廉，中文因爲文字量大的原因，整個字體文件偏大，暫不適合使用 Web Fonts。在這樣的情形下，我們只能儘量利用作業系統自身的字體了。

## Mac

Mac 上默認的中文字體是華文黑體（STHeiti）與華文宋體，我個人認爲質量是不錯的。紙質書的印刷，普遍使用的是宋體，然而在現在的顯示器上，宋體的表現並不令人滿意。

宋體的結構相比於黑體要複雜許多，比如橫線起筆處微小的回鉤，橫豎撇捺點鉤都沒有那麼簡單。這些細膩的處理在現在的顯示器上都無法完美地體現，也許等到 Retina 普及後，宋體才能重拾其在紙質書的光輝。

而黑體則不一樣，結構簡潔，形體勻稱，合適在顯示器上閱讀。所以目前我的選擇是黑體。Mac 上還有一款讚譽頗多的黑體，冬青黑體（Hiragino Sans GB）。

![華文黑體](//dn-lepture.qbox.me/blog/18px-mac-stheiti.png "Mac 上 18px 的華文黑體")

![冬青黑體](//dn-lepture.qbox.me/blog/18px-mac-hiragino.png "Mac 上 18px 的冬青黑體")

我個人以爲兩者都還不錯，冬青黑體整體看來更爲飽滿，偏扁平，而華文黑體則偏瘦一點，比如你看兩者的「口」字。我個人隨大流，選擇了讚譽頗多的冬青黑體。

## Windows

因爲我個人一直使用的是 Mac，對視窗系統沒有太多了解，只知道中易宋體與微軟雅黑。所以只能對這兩者做對比。

![微軟雅黑](//dn-lepture.qbox.me/blog/18px-win-yahei.png "Windows 上 18px 的微軟雅黑")

也許只是個人原因，微軟雅黑看起來不夠圓潤，甚至有鋸齒感。當然，這與 Windows 的字體渲染有關，非微軟雅黑字體之過。但是也有人覺得 Windows 上的微軟雅黑比 Mac 上的冬青黑體更好，嫌棄 Mac 的字體渲染太模糊。我個人認爲 16px 的中易宋體在 Windows 上是更好的選擇。

![中易宋體](//dn-lepture.qbox.me/blog/16px-win-simsun.png "Windows 上 16px 的中易宋體")

Windows 的字體渲染偏銳利，微軟雅黑的顯示就有點尷尬，但是中易宋體是點陣字體，正好利用到了 Windows 的字體渲染優勢。我們看到中易宋體的內容非常清晰悅目。

![中易宋體](//dn-lepture.qbox.me/blog/18px-win-simsun.png "Windows 上 18px 的中易宋體")

但是受限於點陣字體，一旦到 18px 時，渲染效果就沒法看了。所以使用中易宋體時就必須保證字體大小在 18px 以下。

那麼，在 Windows 上，我的選擇是 16px 的中易宋體。但是我並非實際使用者，有 Windows 使用者反饋說微軟雅黑挺好的。於是暫時先用微軟雅黑吧。還是希望能有更多的 Windows 使用者的反饋。

## Linux

在使用 Mac 之前，我一直使用的是 Ubuntu，所有的經驗也都停留在那一時期。也不知道過了這許多年，Linux 上的字體渲染發展得如何了。

Linux 上我的選擇是 18px 的文泉驛微米黑。因爲 Linux 用戶自己喜歡折騰，我的選擇也許無關痛癢。

## The Code

這些經驗最終彙集到了 [yue.css](https://github.com/lepture/yue.css) 這個樣式庫。尤其是對 Windows 的處理，反反覆覆，時而會把微軟雅黑添加進來，時而又移出。到寫作此文時，字體樣式便成了：

```css
.yue {
  font: 400 18px/1.62 "Georgia", "Xin Gothic", "Hiragino Sans GB", "WenQuanYi Micro Hei", "Microsoft YaHei", sans-serif;
}
.windows .yue {
  font-size: 16px;
  font-family: "Georgia", "Xin Gothic", "Hiragino Sans GB", "WenQuanYi Micro Hei", "SimSun", sans-serif;
}
```

Windows 使用 16px 是爲了兼容 Windows XP。在 XP 上，沒有微軟雅黑只有中易宋體，在這種情況下會 Fallback 到中易宋體，而 18px 會導致字體變形。你可能需要一句 JavaScript 來添加 `.windows` 的 class：

```javascript
if(/windows/i.test(navigator.userAgent)){
  document.getElementsByTagName('html')[0].className += ' windows'
}
```

至於 16px，我個人以爲偏小。但是還有許多網站在使用 14px，甚至於還有 12px 的。以現在顯示器的分辨率，14px 的文字閱讀起來就有點吃力了。當然，也有可能我高估了高分屏的普及率了。

## Criticism

1. 豆瓣的日誌影評書評等內容皆是 12px 的，必須點名批評一下。現在已經是 2014 年了，這個字體大小真的看起來很累。
2. 知乎的內容是 13px 的，比起 12px 也好不了多少。不過專欄字體大小有 16px 了，還算不錯。
3. 簡書用 18px 的宋體，這個在 Windows 下是沒有辦法忍受的。但是最不能忍受的還是楷體的標題。

## yue.css

對於文字排版，我並沒有專業的素養。愚之所言，不過個人經驗罷了。最後這些經驗彙集成了樣式集 [yue.css](https://github.com/lepture/yue.css)。

yue.css 不是一個樣式重置(reset)，不會影響到其它標籤的樣式。你所需要的只是給內容區域加上 `.yue` 的 class。簡潔實用，目前用於我的博客，[閱乎](https://yuehu.io/)，當然還有別的朋友在用。

如果你對文字排版有興趣，可以使用 yue.css。如果你對 yue.css 有意見，也歡迎反饋給我。

---

注：本文只關注字體，稍微關注大小，但是賞心的文字排版還包括行高顏色等。