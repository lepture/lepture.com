一點不常用 Font 知識
=====================

:date: 2012-01-06 15:05
:public: false
:tags:
    - css
    - font
:category: work


之前是打算寫一個完整的 Font 知識庫的，發現太龐大了，非一時所能解決，所以打算先介紹點日常生活中不太常用的幾點。

Font Family
------------
font-family 的渲染順序， https://developer.mozilla.org/en/CSS/font-family :

    The font-family property specifies a list of fonts, from highest priority to lowest.
    Font selection does not simply stop at the first font named in the list that is on the user's system.
    Rather, font selection is done one character at a time, so that if an available font does not have a glyph that can display a character needed, the later available fonts are tried.
    However, this doesn't work in Internet Explorer.


如上所述，font-family 是逐字渲染的，比如 

::

    font-family: arial, "Hiragino Sans GB", sans-serif;

如果一個字元 arial 無法渲染，則由 "Hiragino Sans GB" 來渲染。

但是這裡有一個問題，關於 fallback 到 generic family 。很奇怪的一點是 webkit 系並不會根據最後指定的 generic family 去 fallback ，而是根據第一個字體所屬的 generic family 去 fallback 。例如：

::

    font-family: Georgia, sans-serif;

漢字會 fallback 到 serif 。Firefox 的 generic family fallback 機制也不按套路出牌。

generic family 日常使用的一般是 ``serif`` (有襯線字體) 和 ``sans-serif`` (無襯線字體) 。但是除此還有 ``cursive`` 和 ``fantasy`` ， ``cursive`` 表示手寫體， ``fantasy`` 一般是藝術字。


Font Variant
-------------
font-variant 在中文領域應該沒什麼用處。它的可用參數只有 ``small-caps`` ，當使用這個屬性的時候，
所有的小寫都會轉化為大寫，但是和 ``text-transform: uppercase`` 不一樣，原先小寫轉化為大寫的字母會顯得小一些。具體效果可參見本頁下面的導航 Newer Older 。

Comment
-------
注：以上所述未考慮到 windows xp 。

由於 xp 無向量字體，只有點陣支持，故不討論 sans-serif 與 serif 。

需要注意的一點是點陣字體理論上適用於12px-16px，但實際看來大字號的文字顯示並沒有太大問題，不至於粗糙到看不下去。
