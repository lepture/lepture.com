Vim on the Web Page
====================

:summary: javascript - let your web page  be a vim
:date: 2011-05-02
:public: false
:category: work
:tags:
    - vim
    - javascript
    - jquery

I love vim, it's a magic editor.

I hate vim, it's a magic editor.

Obviously, one can't help typing "j" or "k" if he is a vim fan. What a disaster ! For making me easy, I wrote this snippet to make the web page vimable.

The whole site is the demo. And you can find the latest source code at `static js file <http://lepture.com/demo/js/jquery.vim.src.js>`_ .

.. sourcecode:: javascript

    if(window.jQuery){(function($){
        var scrollTo = function(pos, speed) {
            var speed = speed || 400, pos = pos || 0;
            $("html, body").animate({'scrollTop': pos}, speed);
            return false;
        }
        var bindVimKey = function(step, speed) {
            var keyMap = {27:"esc", 71:"g", 73:"i", 74:"j", 75:"k"};
            var step = step || 40, speed = speed || 50;
            var h = $(document).height();
            var b = $('body');
            $(this).keydown(function(e){
                var tagName = e.target.tagName.toLowerCase();
                if("input" == tagName || "textarea" == tagName){
                    if("esc" == keyMap[e.keyCode]){
                        $(e.target).blur(); // leave text area
                        return true;
                    }
                    return true;
                }
                var t = $(document).scrollTop();
                if(!e.shiftKey && "g" == keyMap[e.keyCode]){
                    // "gg" behavior
                    var pressG = b.data('pressG') || 0;
                    if(pressG){
                        // this means that you have pressed "g" before
                        b.removeData('pressG');
                        if(0==t){return false;} // already at top
                        scrollTo(0, speed);
                        return false;
                    }else{
                        b.data('pressG', 1);
                        // another "g" pressing must be in one second
                        setTimeout("(function(){$('body').removeData('pressG')})()", 1000);
                        return false;
                    }
                } else if(!e.shiftKey){
                    b.removeData('pressG');
                    if("j" == keyMap[e.keyCode]){
                        if(t > h-5){return false;}
                        scrollTo("+="+step, speed);
                        return false;
                    }else if("k" == keyMap[e.keyCode]){
                        if(t<2){return false;}
                        scrollTo("-="+step, speed);
                        return false;
                    }else if("i" == keyMap[e.keyCode]){
                        $('input:text,textarea').eq(0).focus();
                        return false;
                    }
                }else if("g" == keyMap[e.keyCode]){
                    // shift + g
                    b.removeData('pressG');
                    if(h==t){return false;}
                    scrollTo(h, speed);
                    return false;
                }
            });
        }
        $.extend($.fn, {
            scrollTo: scrollTo,
            bindVimKey: bindVimKey
        });
    })(jQuery);}

    if(window.jQuery){(function($){
        $(function(){
            $(window).bindVimKey();
        });
    })(jQuery);}


what this snippet does:

+ **j**: scroll down
+ **k**: scroll up
+ **gg**: scroll to top
+ **shift g**: scroll to bottom
+ **i**: focus on the form, insert mode
+ **esc**: leave insert mode

what this snippet doesn't , but this site supports:

+ **h**: go to previous article
+ **l**: go to next article
+ **/**: search
