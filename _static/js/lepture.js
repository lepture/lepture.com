$(function(){
    function fetch_github_commits(github_repo) {
        var h = $("#github-section").position()["top"] - $(window).scrollTop() - $(window).height() - 4;
        if (h > 0) { return }
        window.is_github_fetched = true;
        $('#github-section').html('<p><strong>Github Commits</strong></p><ul id="github-commits"></ul>');
        setTimeout("$('#github-commits').html('<li>Loading ... </li>')", 400);
        var url = 'https://api.github.com/repos/' + github_repo + '/commits?callback=?';
        $.getJSON(url, function(json){
            var items = [];
            $.each(json.data, function(index, item) {
                var li = '<li><a target="_blank" href="https://github.com/'
                + item.author.login + '"><img src="' + item.author.avatar_url
                + '&s=24" /></a> <a target="_blank" href="https://github.com/'
                + github_repo + '/commit/' + item.sha + '">'
                + item.commit.message + '</span></li>';
                items.push(li);
            });
            $('#github-commits').html(items.join(''));
        });
    }

    var currentNav = window.currentNav || '#nav-archive';
    $(currentNav).addClass('current');
    $('a[href^=http]:not(a[href^="http://lepture.com"])').attr('target', '_blank');
    $("#toc").html($("#table-of-contents"));
    $(".toc-backref").each(function(index, item){
        $(item).parent().html($(item).html());
    });
    $(document).keydown(function(e) {
        var tagName = e.target.tagName.toLowerCase();
        if("input" == tagName|| "textarea" == tagName){return ;}
        if(37 == e.keyCode || 72 == e.keyCode){
            var url = $('#older-entry').attr('href');
        }else if(39 == e.keyCode || 76 == e.keyCode){
            var url = $('#newer-entry').attr('href');
        }
        var url = url || '';
        if(url){location.assign(url);}
    });
    $(window).scroll(function () {
        if (window.github_repo && !window.is_github_fetched) {
            fetch_github_commits(github_repo);
        }
    });
    /* footnote */
    $('table.footnote').each(function(index, item){
        $('#sidenote').append(item);
    });
    $('a.footnote-reference').hover(function(){
        $($(this).attr("href")).slideDown('fast');
    }, function(){
    });
});
