Microdata vs Microformat
===========================

:summary: microdata vs microformat, the better way for format your data: microdata with microformat
:date: 2011-10-11
:folder: work
:tags:
    - html
    - seo
    - google


今歲六月初，三大搜索引擎，也就是Google、Bing和Yahoo!，聯合推出了 `schema.org <http://schema.org>`_ ，旨在提供一個統一的有利於索引的標準。這自然是好事，可是四個月過去了，還沒有一家支持的。
雖然 Google 聲稱已經支持 schema.org ，好事者如我，試了一下，發現並不像它所說的，其實都還不能識別。

但是 Google 確實支持微數據 [1]_ 。例如，你是否有見過如下的搜索結果呢？

.. image:: http://www.googel.com//help/hc/images/webmasters_99170_rsreview.png
   :alt: search result

可見 `Google是支持微數據 <http://www.google.com/support/webmasters/bin/answer.py?answer=99170>`_ 的。而且，其實支持很久了。


Microdata_
------------

.. sourcecode:: html

    <div>
      <div itemscope itemtype="http://schema.org/Review">
        <span itemprop="itemReviewed">L’Amourita Pizza</span>
        Reviewed by <span itemprop="author">Ulysses Grant</span> on
        <time itemprop="dateCreated" datetime="2009-01-06">Jan 6</time>.
        <span itemprop="description">L'Amourita serves up traditional wood-fired Neapolitan-style pizza, 
          brought to your table promptly and without fuss. An ideal neighborhood pizza joint.</span>
        Rating: <span itemprop="reviewRating">4.5</span>
      </div>
    </div>

Pro
~~~~
1. Microdata_ 是 HTML 標準
2. schema.org 使用 microdata，且未來會被三大搜索引擎支持（也許更多）

Con
~~~~
1. schema.org 目前還不可用
2. 增加了額外內容，增加了數據傳輸量

schema.org 可以暫時用 `data-vocabulary <http://data-vocabulary.org>`_ 代替，這樣 Google 就可以識別出微數據了。

Microformat_
------------
.. sourcecode:: html

    <div class="hreview">
       <span class="item">
          <span class="fn">L’Amourita Pizza</span>
       </span>
       Reviewed by <span class="reviewer">Ulysses Grant</span> on
       <span class="dtreviewed">
          Jan 6<span class="value-title" title="2009-01-06"></span>
       </span>.
       <span class="summary">Delicious, tasty pizza on Eastlake!</span>
       <span class="description">L'Amourita serves up traditional wood-fired   
       Neapolitan-style pizza, brought to your table promptly and without fuss. 
       An ideal neighborhood pizza joint.</span>
       Rating: 
       <span class="rating">4.5</span>
    </div>

Pro
~~~~
1. 使用 ``class`` ``rel`` 等標籤，未產生額外內容(考慮到這些 ``class`` ``rel`` 本身有用處)
2. 相比於 microdata ，對人類更友好 (microdata 對機器友好)
3. 支持度比較高，相關標準比較成熟，如 `vcard <http://microformats.org/wiki/hcard>`_

Con
~~~~
1. 非 W3C 標準

沒發現還有甚麼缺點，而且可以利用其命名規範。


Conclusion
-----------
因為 microdata 與 microformat 在標籤使用上並不衝突，可結合起來使用。如：

.. sourcecode:: html

    <div class="hreview-aggregate" itemscope itemtype="http://schema.org/Place">
        <h2 class="item"><a class="url fn" href="http://www.example.com/beijing" itemprop="name">北京</a></h2>
        <p class="rating" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
        <span class="average" itemprop="ratingValue">6.5</span>
        <span>( <span class="votes" itemprop="ratingCount">50</span>人参与投票 )</span>
        <span class="best" itemprop="ratingBest">10</span>
        </p>
    </div>

這樣目前 Google 可以識別 microformat ，只等 Google,Bing,Yahoo! 部署好 schema.org 的支持。 :)

`DEMO <http://lepture.com/demo/schema/>`_ ，效果測試 `Google <http://www.google.com/webmasters/tools/richsnippets?url=http%3A%2F%2Flepture.com%2Fdemo%2Fschema%2F&view=cse>`_ 。

BTW， `豆瓣 <http://www.douban.com>`_ 使用的是 ``RDFa`` 。 不推薦使用。

.. _Microdata: http://www.w3.org/TR/microdata/
.. _Microformat: http://microformats.org

.. [1] 微數據：展示頁面所包含的有特定意義的數據，如評分等用戶行為、如電影產品等屬性。
