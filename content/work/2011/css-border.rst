CSS Border
===========================

:summary: 
    利用Border 的 CSS 模型构造下拉图标，及其它。
:date: 2011-10-21
:folder: work
:tags:
    - html
    - css


Border 的模型：

.. image:: http://i.imgur.com/XRyDQ.png
   :alt: css border


如果内容区无高度与宽度，那么四个border不就是三角形了么？

因为 ``border-color`` 支持 ``transparent`` 属性，可想而知，若其它三边是透明的，只有一边不透明，这一边不就构成了三角么。 [ `CSS Border DEMO <http://lepture.com/demo/css-border/>`_ ]

.. sourcecode:: css

    div {
        width: 0; height: 0;
        border: 30px solid transparent;
        border-top-color: black;
    }

如上代码则构成了一个顶角向下的三角形，非常适合用来做下拉选项的标志。Google 导航栏上的那个 ``More`` 正是如此构造出来的。

More shapes via Reorx's sharing: http://css-tricks.com/examples/ShapesOfCSS/
