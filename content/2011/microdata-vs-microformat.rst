Microdata vs Microformat
===========================

:summary: microdata vs microformat, the better way for format your data: microdata with microformat
:date: 2011-10-11
:folder: work
:tags:
    - html
    - seo
    - google


今岁六月初，三大搜索引擎，也就是Google、Bing和Yahoo!，联合推出了 `schema.org <http://schema.org>`_ ，旨在提供一个统一的有利于索引的标准。这自然是好事，可是四个月过去了，还没有一家支持的。
虽然 Google 声称已经支持 schema.org ，好事者如我，试了一下，发现并不像它所说的，其实都还不能识别。

但是 Google 确实支持微数据 [1]_ 。例如，你是否有见过如下的搜索结果呢？

.. image:: http://d.pr/y0wz+
   :alt: search result

可见 `Google是支持微数据 <http://www.google.com/support/webmasters/bin/answer.py?answer=99170>`_ 的。而且，其实支持很久了。


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
1. Microdata_ 是 HTML 标准
2. schema.org 使用 microdata，且未来会被三大搜索引擎支持（也许更多）

Con
~~~~
1. schema.org 目前还不可用
2. 增加了额外内容，增加了数据传输量


schema.org 可以暂时用 `data-vocabulary <http://data-vocabulary.org>`_ 代替，这样 Google 就可以识别出微数据了。

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
1. 使用 ``class`` ``rel`` 等标签，未产生额外内容(考虑到这些 ``class`` ``rel`` 本身有用处)
2. 相比于 microdata ，对人类更友好 (microdata 对机器友好)
3. 支持度比较高，相关标准比较成熟，如 `vcard <http://microformats.org/wiki/hcard>`_

Con
~~~~
1. 非 W3C 标准

没发现还有什么缺点，而且可以利用其命名规范。


Conclusion
-----------
因为 microdata 与 microformat 在标签使用上并不冲突，可结合起来使用。如：

.. sourcecode:: html

    <div class="hreview-aggregate" itemscope itemtype="http://schema.org/Place">
        <h2 class="item"><a class="url fn" href="http://www.example.com/beijing" itemprop="name">北京</a></h2>
        <p class="rating" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
        <span class="average" itemprop="ratingValue">6.5</span>
        <span>( <span class="votes" itemprop="ratingCount">50</span>人参与投票 )</span>
        <span class="best" itemprop="ratingBest">10</span>
        </p>
    </div>

这样目前 Google 可以识别 microformat ，只等 Google,Bing,Yahoo! 部署好 schema.org 的支持。 :)

`DEMO <http://lepture.com/demo/schema/>`_ ，效果测试 `Google <http://www.google.com/webmasters/tools/richsnippets?url=http%3A%2F%2Flepture.com%2Fdemo%2Fschema%2F&view=cse>`_ 。

BTW， `豆瓣 <http://www.douban.com>`_ 使用的是 ``RDFa`` 。 不推荐使用。

.. _Microdata: http://www.w3.org/TR/microdata/
.. _Microformat: http://microformats.org

.. [1] 微数据：展示页面所包含的有特定意义的数据，如评分等用户行为、如电影产品等属性。
