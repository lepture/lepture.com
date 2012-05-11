{% if context.ga %}
<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', '{{context.ga}}']);
_gaq.push(['_trackPageview']);
WebFontConfig = {
    google: { families: window.wfonts }
};
(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    if(window.wfonts) {
        var wf = document.createElement('script');
        wf.type = 'text/javascript'; wf.async = 'true';
        wf.src = 'http://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        s.parentNode.insertBefore(wf, s);
    }
})();
</script>
{% endif %}
