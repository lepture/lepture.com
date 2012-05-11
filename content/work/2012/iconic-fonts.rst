Iconic Fonts
==============

:folder: work
:date: 2012-05-11 15:23
:tags:
    - font
    - icon
    - design


昨天 GitHub 更新了全站的圖標，新的圖標使用了 iconic fonts ，而不是傳統的圖片。GitHub 將其命名為 Octicons_ 。

.. _Octicons: https://github.com/blog/1106-say-hello-to-octicons

我個人覺得比較遺憾的是，為何 GitHub 有精力浪費在這樣的事上，而不願意去整合一下它那毫無意義的信息流呢？只要稍微做一個合併， News Feed 的可用性就不知道上了多少台階。


Iconic Fonts 簡介
---------------------

Iconic Fonts 漢語譯為圖形化字體，例如 emoji_ 就是 iconic fonts 。這是因為，在 unicode 中，有一段 `Private Use Area <http://en.wikipedia.org/wiki/Private_Use_Area>`_ (U+E000 – U+F8FF) ，這一段字元區域屬於用戶私有，iconic fonts 就是利用這一字段，將字體設計成圖標，從而實現了以文字來表示 icon 。 Octicons 利用的是 UTF+F000 到 UTF+F073 和 UTF+F200 到 UTF+F273 區域。

.. _emoji: http://chuo.me/2012/02/emoji

Iconic Fonts 的興起得益於 web fonts 的普及，而在 web fonts 的基礎上利用 unicode Private Use Area 來實現圖標還真是天才的想法。

第一次接觸 iconic fonts 是 entypo_ ，當時沒能引起太多注意。直到 Font Awesome 的出現，因為搭上了 twitter bootstrap ，一時名聲鵲起。而昨日 GitHub 全面使用 iconic fonts ，再加上 fontello_ 的橫空出世，一石激起千層浪。（當然，因為還是有人不知道，所以這裡介紹一下）

.. _entypo: http://forr.st/~dMV


為何使用 Iconic Fonts
---------------------

以下所列的使用 iconic fonts 的好處只是我個人的想法，也許不全，也許是錯誤的。

1. 天生的 css sprite

   因為是文字，一套字體就可以當作是一套 css sprite

2. 尺寸無關

   當使用圖片時， 24x24, 36x36, 48x48 將會是三套圖，而使用 iconic fonts 只需要設置 font-size 即可。

3. 精細度的保證

   放大一張圖片，圖片將會失真。而放大 iconic fonts 則不會。（可嘗試 zoom in & zoom out  GitHub 的網站)


Iconic Fonts 的使用
-----------------------

1. 獲取 fonts

   + 直接下載 Octicons_ 或者 entypo_ 或者 Font Awesome
   + 從 fontello_ 上生成
   + 自己設計 

2. 嵌入 web fonts

   + 直接使用  `@font-face <https://developer.mozilla.org/en/CSS/@font-face>`_
   + 使用 js loader: https://github.com/typekit/webfontloader

3. 使用 font

   + 直接在 html 中使用，建議用 ``&#***;`` 轉義碼。比如 UTF+F000 則是 ``&#61440;`` 。
   + 在 css 中使用，同時也是 GitHub 的使用方法。例如: ``.icon1:after {content:"\f000";}``

參考 GitHub 的使用方法： https://github.com/styleguide/css/7.0


Iconic Fonts 設計
--------------------

同字體設計，你需要一款字體設計軟體。請諮詢專業人士。


大陸區的問題
---------------------

眾所周知的問題：

1. IE6 : 你不能用 ``:after`` ``:before`` ，所以 css 的使用方法無法使用

2. GBK : 你不能在 html 中使用 unicode private use area 了

綜上所述，敝廠無法使用。

當然也有解決之道，即尋找出 GBK 是不常用的字，用此字的編碼位設計 icon 。

.. _fontello: http://fontello.com