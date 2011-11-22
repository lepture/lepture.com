Auto Textarea Resize
=====================

:summary: 
    Auto resize textarea's height according to the content it contains.

:date: 2011-11-22
:folder: work
:tags:
    - javascript
    - jquery


豆瓣首页的我说有一个可根据文本内容伸缩的textarea。但是总觉得做得很粗糙，不知道你使用中是否和我一样，当换行的时候总能看到文字一跳一跳的。想起很久之前在Forrst发过的一篇文章 `Auto Resize Textarea <http://forrst.com/posts/Auto_Resize_Textarea-1eS>`_ ，还是借鉴的豆瓣呢。

当时刚开始写前端，现在回想起来，不免汗颜。对原码做了点修正，让伸缩显得更自然。跳过本文，阅读源码 http://d.pr/dpzD 。

具体实现原理如下：

Make a Clone
------------
1. clone 一份原 textarea: ``var clone = el.clone();``
2. 清理 clone 的选择器: ``clone.removeAttr('id').removeAttr('class')`` 
3. css隐藏clone (不能用 ``display:none``): 
   ``clone.css({'position':'absolute',top:'-9999em',left:'-9999em'})``

最后的代码如下:

.. sourcecode:: javascript

    var clone = el.clone().removeAttr('id').removeAttr('class').css({position:'absolute', top:'-9999em',left:'-9999em',width: el.width(), height: 'auto'}).appendTo('body');

Calculate Height
-----------------
计算高度: ``h = clone.val(el.val()).height(0).scrollTop(10000).scrollTop() + 16;``

豆瓣的问题就出在这里，新的高度相对于原高度豆瓣是 +5 。于是伸展的时候不够用。


DEMO
-------
古人云 "A picture(demo) is worth a thousand words" ，所以还是看 `demo <http://lepture.com/demo/auto-textarea-resize/>`_ 吧。

对IE做了点小处理，IE没有使用animate。

CODE
----------
原码再现

.. sourcecode:: javascript

    if(window.jQuery){(function($){
        $.fn.textResizer = function(options) {
            var el = $(this), h;
            var settings = {
                minHeight: el.height(),
                maxHeight: 300,
                duration: 100
            }
            if (options) {
                $.extend(settings, options);
            }
            var clone = el.clone().removeAttr('id').removeAttr('class').css({position:'absolute', top:'-9999em',left:'-9999em',width: el.width(), height: 'auto'}).appendTo('body');
            $(this).keyup(function(e) {
                h = clone.val(el.val()).height(0).scrollTop(10000).scrollTop() + 16;
                h = Math.min(Math.max(settings.minHeight, h), settings.maxHeight);
                if (el.height() != h) {
                    if($.browser.msie) {
                        el.height(h);
                    } else {
                        el.stop(1,1).animate({height: h}, settings.duration);
                    }
                }
            });
            return this;
        }
    })(jQuery);}
