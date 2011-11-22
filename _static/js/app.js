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
    var bindVimKey = function(step, speed, searchInput) {
        // "gg" go top, "shift+g" go bottom
        // "j" scroll down, "k" scroll up
        // "i" insert mode, auto focus on the very first input area
        // "esc" leave insert mode
        // TODO indicate capslock
        var keyMap = {27:"esc", 71:"g", 73:"i", 74:"j", 75:"k", 191:"/"};
        var step = step || 40, speed = speed || 30;
        var searchInput = searchInput || 'search-input';
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
        var isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|Blackberry|mobile)/);
        var currentNav = window.currentNav || '#nav-home';
        $(currentNav).addClass('current');
        if(!isMobile) {
            $(document).bindVimKey();
            $(document).keydown(function(e) {
                var tagName = e.target.tagName.toLowerCase();
                if("input" == tagName|| "textarea" == tagName){return ;}
                if(37 == e.keyCode || 72 == e.keyCode){
                    var url = $('#prev-entry').attr('href');
                }else if(39 == e.keyCode || 76 == e.keyCode){
                    var url = $('#next-entry').attr('href');
                }
                var url = url || '';
                if(url){location.assign(url);}
            });
        }
        if($('div.rdbWrapper').length && !isMobile) {
            $('#footer').after('<script type="text/javascript" src="http://www.readability.com/embed.js" async></script>');
        }
        if(isMobile) {
            $('#nav-work, #search-form').hide();
            $('#header nav, #nav li').height(36);
            $('#nav a').css({fontSize: 13, lineHeight: '36px'});
        }
    });
})(jQuery);}

var wfonts = window.wfonts || ['Lato:700:latin', 'Volkhov::latin'];
WebFontConfig = {
    google: { families: wfonts }
};
(function() {
    var wf = document.createElement('script');
    wf.src = 'http://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
