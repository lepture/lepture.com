Auto Textarea Resize
=====================

:summary: 
    Auto resize textarea's height according to the content it contains.

:date: 2011-11-22
:category: work
:public: false
:tags:
    - javascript
    - jquery


豆瓣首頁的"我說"有一個可根據文本內容伸縮的textarea。但是總覺得做得很粗糙，不知道你使用中是否和我一樣，當換行的時候總能看到文字一跳一跳的。想起很久之前在Forrst發過的一篇文章 `Auto Resize Textarea <http://forrst.com/posts/Auto_Resize_Textarea-1eS>`_ ，還是借鑒的豆瓣呢。

當時剛開始寫前端，現在回想起來，不免汗顏。對源碼做了點修正，讓伸縮顯得更自然。跳過本文，閱讀源碼 http://d.pr/dpzD 。

具體實現原理如下：

Make a Clone
------------
1. clone 一份原 textarea: ``var clone = el.clone();``
2. 清理 clone 的選擇器: ``clone.removeAttr('id').removeAttr('class')`` 
3. css隱藏clone (不能用 ``display:none``): 
    ``clone.css({'position':'absolute',top:'-9999em',left:'-9999em'})``

最後的代碼如下:

::

    var clone = el.clone().removeAttr('id').removeAttr('class')
                  .css({position:'absolute', top:'-9999em',left:'-9999em',width: el.width(), height: 'auto'})
                  .appendTo('body');

Calculate Height
-----------------
計算高度: 

::

    h = clone.val(el.val()).height(0).scrollTop(10000).scrollTop() + 16;

豆瓣的問題就出在這裡，新的高度相對於原高度豆瓣是 +5 。於是伸展的時候不夠用。當然我上面 +16 也是不正確的做法，應該動態獲取文字大小。


DEMO
-------
古人雲 "A picture(demo) is worth a thousand words" ，所以還是看 `demo <http://lepture.com/demo/auto-textarea-resize/>`_ 吧。

對IE做了點小處理，IE沒有使用animate。

CODE
----------
源碼再現

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
