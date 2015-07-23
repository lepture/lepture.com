# 前端的基礎修養：Microdata

- date: 2015-07-23 22:17:00
- tags: fe-basic, html

Microdata 是為機器而不是用戶所設計的，雖然目的是易於機器理解，但最終也能惠於用戶。

---

「前端的基礎修養」是我擬寫的一系列文章的總標題。所以喚作「修養」，大抵因為心虛，覺得沒有什麼技術含量，不便言之技術。這一系列文章多與 HTML/XML 相關，許多主題一般前端從業者不是太知道，或者知道但不太重視，我以為很可惜。

這是「前端的基礎修養」系列文章的第一篇，單講 [Microdata](http://www.w3.org/TR/microdata/) 相關的內容，剩下的主題每周不定期更新。

Microdata 是 HTML5 引入的，是為機器而不是用戶所設計的，主要目的是為了機器能更好的理解內容。這看起來與前端沒什麼關係，一般理解的前端是服務於用戶的，主要負責與用戶交互的部分。但是 microdata 是 HTML 的一部分，雖然目的是易於機器理解，但最終也能惠於用戶。

![Google 搜索結果展示](//dn-lepture.qbox.me/blog/schema-google.png)

Microdata 以機器可解析的語言來描述網頁里的內容是什麼，比如網頁描述的是一本書、一篇影評或者一張菜譜。例如上面的這張圖，展示的是我的[一篇書評](/zh/2011/dajiangdahai)在 Google 搜索里的結果，它有作者信息、有評分、有發表時間，這都是因為這篇書評的網頁里使用 Microdata 標示出了相應的信息。

## Microdata 基礎

Mircodata 主要用到這幾個 attributes 來標注信息：itemscope, itemtype, itemprop，另外還有 itemid 與 itemref。

包含 **itemscope** 這個 attribute 的 DOM 樹就是一個事物(item)，例如：

```html
<div itemscope>
...
</div>
```

我們可以給這個事物定義一個類型，比如一本書，這時就需要用到 **itemtype**，它的值是一個或多個 URL：

```html
<div itemscope itemtype="http://example.com/Book">
...
</div>
```

如上的代碼片斷，我們知道它是一本書了，但是它還缺少書的信息，需要用 **itemprop** 來標示：

```html
<div itemscope itemtype="http://example.com/Book">
  <div>書名：<span itemprop="name">改革歷程</span></div>
  <div>作者：<span itemprop="author">趙紫陽</span></div>
  ...
</div>
```

也許因為奇怪的設計方案，也許因為 PM 的無理取鬧，也許就是因為代碼不太好寫，佈局並不能輕易合乎要求，itemprop 可能散落於其它地方，這時可以使用 **itemref** 將它們連接起來：

```html
<div itemscope itemtype="http://example.com/Book" itemref="a b">
  <div>作者：<span itemprop="author">趙紫陽</span></div>
  ...
</div>

<!-- 因為某些原因，書名與價格不在 scope 裡面 -->
<div id="a">書名：<span itemprop="name">改革歷程</span></div>
<div id="b">價格：<span itemprop="price">$12</span></div>
```

Microdata 也定義了 DOM API，目前只有 Firefox 與 Opera 支持，用途不太大，可以在 Firefox 的終端里測試一下：

```js
document.getItems()
document.getItems('http://schema.org/Article')
```

## Microdata 與 Schema.org

Microdata 作為規範，定義好了語法，其中 **itemtype** 表示事物的類型。如果每一家都自己定義 **itemtype** 的話，結局將相當糟糕，網站開發者也將頭疼不已。於是 Google, Bing, Yandex, Yahoo! 合作創建了 Schema.org 用以統一規範 Microdata。

Schema.org 不是標準化組織，所做的卻是標準化的事情。查閱 [Schema.org 快速入門](https://schema.org/docs/gs.html)文檔，瞭解如何使用。例如你正在看的這篇文章所在的頁面便在使用 <http://schema.org/Article> 這個 itemtype，你可以查看一下本頁面的源碼。

Schema.org 定義了[許多類型](http://schema.org/docs/full.html)，仍然在[創建更多的類型](https://github.com/schemaorg/schemaorg)。這些定義對後端開發也有意義，幫助你理解業務模型，瞭解某一模型應該包含哪些數據，亦是不小的啓發。

比如我們來賣個車看看：<http://schema.org/Car>

```html
<div itemscope itemtype="http://schema.org/Car">
  <h2 itemprop="name">奇瑞QQ</h2>
  <p itemprop="description">中國汽車製造商奇瑞汽車公司於2003年推出的一款微型車(...)</p>
  <img itemprop="image" href="2003_qq.png" />
  <div>
    <strong>顏色</strong>
    <span itemprop="color">黑色</span>
  </div>
  <div>
    <strong>齒輪數</strong>
    <span itemprop="numberOfForwardGears">6</span>
  </div>
  <div itemprop="vehicleEngine" itemscope itemtype="http://schema.org/EngineSpecification">
    <div>
      <strong>引擎</strong>
      <span itemprop="name">1.1 L SQR472F I4 DOHC 16v — 50 kW at 6000 rpm, 90 N·m at 3500 rpm</span>
    </div>
  </div>
  <div>
    <strong>氣囊數</strong>
    <span itemprop="airbags">4</span>
  </div>
</div>
```

## RDFa, Microformats 與 JSON-LD

結構化數據在 Microdata 出來之前就已經有了，比如 RDFa，比如 Microformats。Microdata 正是站在他們肩膀上，總結他們的得失利弊發展起來的。

Schema.org 的示例通常包含 Microdata，RDFa 與 JSON-LD 格式。RDFa 主要引入了 vocab, typeof 與 property 作為 attributes。這裡不再談 RDFa 的格式與實現，推薦使用 Microdata。但是需知 RDFa 仍然在被使用，比如豆瓣網，因為創建時間早，又沒有升級代碼，仍然使用著 RDFa，他們使用的字典集是 <http://www.data-vocabulary.org/>。

Microformats 已經十年了，這是一套使用 class 輔以其它屬性來標記事物的方案。比如這篇文章的這個頁面亦使用 Microformats 做了標注，類型是 [hentry](http://microformats.org/wiki/hentry)。Microformats 現在推出了 2.0 版本，預測支持性不會太好，但是仍然值得一讀，當作指導前端的 class 命名也不錯。正在使用的 hentry 是 1.0:

```html
<div class="hentry">
  <h1 class="entry-title">前端的基礎修養：Microdata</h1>
  <div class="entry-content">...</div>
  ...
</div>
```

JSON-LD 誕生的時間更晚，是一套使用 JSON 格式標注數據的方案。最大的優點是 JSON 格式便於解析，缺點是數據冗余，尤其是在需要 HTML 展示大段內容的情況下。

## Microdata & Schema.org 的現狀與未來

目前 Google, Bing, Yandex, Yahoo! 都支援 Microdata，但是進度不一效果不一，支援度最好的還是 Google。據說[百度也是支持的](http://www.zhihu.com/question/19918861)。

各個搜索引擎商的接入文檔：

1. https://developers.google.com/structured-data/
2. http://www.bing.com/webmaster/help/marking-up-your-site-with-structured-data-3a93e731
3. https://help.yandex.com/webmaster/microdata/what-is-microdata.xml
4. https://help.yandex.com/webmaster/schema-org/what-is-schema-org.xml

結構化的數據不僅僅能被這些 Web 搜索引擎使用，還能被諸如 Siri, Cortana 等語音設備使用，當然，他們也能被當作搜索引擎。例如我問 Siri 最近有什麼電影可看，於是找到了《模仿遊戲》

![電影展示](//dn-lepture.qbox.me/blog/siri-movie.jpg "Siri 展示的模仿遊戲")

這個內容來自[爛番茄](http://www.rottentomatoes.com/)，爛番茄的網頁有使用 Schema.org 的 Microdata 標注，不知道 Siri 是否解析了 Microdata，還是專門為爛番茄作瞭解析。

再次詢問 Siri 附近吃飯的地方，返回了大眾點評的數據：

![餐廳列表](//dn-lepture.qbox.me/blog/siri-restaurants.jpg "Siri 展示的餐廳列表")

查看大眾點評的網頁，亦是使用 Schema.org 的 Microdata 標注的。

因為沒有 Android 與 Windows 手機，無法展示 Google Now 與 Cortana 的效果。查閱 [Microsoft Cortana 的文檔](https://msdn.microsoft.com/en-us/library/dn632191.aspx)可知其是支持 Schema.org 的。Google Now 就更不必說了。

結構化的數據在未來相當有吸引力，方便未來的各種設備接入。比如「智能廚房」，你告訴它你要做什麼菜，於是它從[下廚房](http://www.xiachufang.com/)找到了菜譜，因為下廚房使用了結構化數據，「智能廚房」就能直接列出需要的材料與材料的份量。

目前正在應用的點有很多，比如日曆、地圖、郵件等。尤其值得一提的是郵件，這個古老的通訊方式也許會在結構化數據下煥然一新。Gmail 已經在做[一系列嘗試](https://developers.google.com/schemas/tutorials/embedding-schemas-in-emails)了，比如從郵件里提取出你的行程以及日程安排，比如匯總你的收據。

寫作此篇時發現國內不少網站已經在應用 Microdata 了，頗感欣慰。然而國內大廠們依舊我行我素，走著自己的獨木橋。

## 索引

* Microdata: <http://www.w3.org/TR/microdata/>
* JSON-LD: <http://www.w3.org/TR/json-ld/>
* RDFa: <http://www.w3.org/TR/xhtml-rdfa-primer/>
* Microformats: <http://microformats.org/>
* 
Embed Schemas in Emails: <https://developers.google.com/schemas/tutorials/embedding-schemas-in-emails>
