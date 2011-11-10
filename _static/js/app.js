/*
 * @author lepture
 * @website http://lepture.com
 * @require jquery.js
 */
if(window.jQuery){(function($){
    var scrollTo = function(pos, speed) {
        var speed = speed || 400, pos = pos || 0;
        $("html, body").animate({'scrollTop': pos}, speed);
        return false;
    }
    var bindVimKey = function(step, speed, searchInput, searchWrap) {
        // "gg" go top, "shift+g" go bottom
        // "j" scroll down, "k" scroll up
        // "i" insert mode, auto focus on the very first input area
        // "esc" leave insert mode
        // TODO indicate capslock
        var keyMap = {27:"esc", 71:"g", 73:"i", 74:"j", 75:"k", 191:"/"};
        var step = step || 40, speed = speed || 50;
        var searchInput = searchInput || 'search-input';
        var searchWrap = searchWrap || 'search-form-wrap';
        var h = $(document).height();
        var b = $('body');
        $(this).keydown(function(e){
            var target = e.target || event.srcElement;
            var tagName = target.tagName.toLowerCase();
            if("input" == tagName || "textarea" == tagName){
                // document.activeElement == e.target && "esc" == keyMap[e.keyCode]
                // No need for document.activeElement == e.target
                if("esc" == keyMap[e.keyCode]){
                    $(e.target).blur(); // leave text area
                    if(searchInput == e.target.id) {
                        $("#"+searchWrap).hide();
                        $('#nav-search').removeClass('fn-current');
                    }
                    return true;
                }
                return true;
            }
            var t = $(document).scrollTop();
            if(!e.shiftKey && "g" == keyMap[e.keyCode]){
                // "gg" behavior
                var pressG = b.data('pressG') || 0; // for counting "g" press
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
                }else if("/" == keyMap[e.keyCode]){
                    // show search form. for my own use
                    $('#'+searchWrap).show();
                    $('#'+searchInput).focus();
                    $('#nav-search').addClass('fn-current');
                    return false;
                }
            }else if("g" == keyMap[e.keyCode]){
                // shift + g
                b.removeData('pressG');
                if(h==t){return false;}
                scrollTo(h, speed);
                return false;
            }
            return true;
        });
    }
    $.extend($.fn, {
        scrollTo: scrollTo,
        bindVimKey: bindVimKey
    });
})(jQuery);}

if(window.jQuery){(function($){
    $(function(){
        var currentNav = window.currentNav || '#nav-home';
        $(currentNav).addClass('current');
        $(document).bindVimKey();
    });
})(jQuery);}
