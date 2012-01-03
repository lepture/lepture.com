CSS Border
===========================

:summary: 
    利用Border 的 CSS 模型構造下拉圖標，及其它。
:date: 2011-10-21
:folder: work
:tags:
    - html
    - css


Border 的模型：

.. image:: http://i.imgur.com/XRyDQ.png
   :alt: css border


如果內容區無高度與寬度，那麼四個border不就是三角形了麼？

因為 ``border-color`` 支持 ``transparent`` 屬性，可想而知，若其它三邊是透明的，只有一邊不透明，這一邊不就構成了三角麼。 [ `CSS Border DEMO <http://lepture.com/demo/css-border/>`_ ]

.. sourcecode:: css

    div {
        width: 0; height: 0;
        border: 30px solid transparent;
        border-top-color: black;
    }

如上代碼則構成了一個頂角向下的三角形，非常適合用來做下拉選項的標誌。Google 導航欄上的那個 ``More`` 正是如此構造出來的。

More shapes via Reorx's sharing: http://css-tricks.com/examples/ShapesOfCSS/
