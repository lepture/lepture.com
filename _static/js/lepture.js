$(function(){
    // copy from stevelosh.com
    var h2s = null;
    function place_scrolly_header() {
        var c = 75;
        var e = $(window).scrollTop();
        var d = null;
        var a = null;
        var b = null;
        h2s.each(function () {
            var h = $(this).position()["top"] - c;
            if (e < h) {
                return false
            }
            b = h;
            d = $(this).html().replace(/&nbsp;/g, " ");
            var f = e - (b + c);
            a = f / c;
            if (a > 1) {
                a = 1
            }
            if (a > 0.99) {
                var j = $(this).nextAll("h2");
                if (j.length) {
                    var i = j.first().position()["top"];
                    var g = i - e;
                    if (g <= c * 2) {
                        a = 1 / (c - g / 2)
                    }
                }
            }
        });
        $("#scrolling-header").css({
            opacity: a
        }).css("left", h2s.first().position()["left"] - 180 - 35).html(d)
    }

    var isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|Blackberry|mobile)/);
    var currentNav = window.currentNav || '#nav-home';
    $(currentNav).addClass('current');
    if(isMobile) {
        $('#nav-work, #search-form, #github').hide();
        $('#header nav, #nav li').height(36);
        $('#nav a').css({fontSize: 13, lineHeight: '36px'});
    } else {
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
        var h2s = $(".entry-content h2");
        $("body").append('<div id="scrolling-header"></div>');
        $(window).scroll(function () {
            place_scrolly_header()
        })
    }
    $('a[href^=http]:not(a[href^="http://lepture.com"])').attr('target', '_blank');
});
