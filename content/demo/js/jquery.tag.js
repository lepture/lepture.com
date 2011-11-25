/*
 * @require jquery.js
 * @author lepture
 * @website http://lepture.com
 */

if(window.jQuery){(function($){
    var tagbox = function(options) {
        var $this = this;
        var settings = {
            'confirm': ['comma', 'space', 'tab'],
            'delete': ['backspace','delete']
        }
        if (options) {
            $.extend(settings, options);
        }
        var tagul = document.createElement('ul');
        tagul.className = 'tagbox fn-clear';
        var newtag = document.createElement('li');
        newtag.className = 'new-tag';
        var taginput = document.createElement('input');
        taginput.type = 'text';
        newtag.appendChild(taginput);
        tagul.appendChild(newtag);
        /* <ul class="tagbox">
         *     <li class="new-tag"><input type="text" /><li>
         * </ul>
         */
        $this.before(tagul);
        var tagli = '<li><span class="tag">{tag}</span></li>';
        if (this.val()) {
            var tags = this.val().split(',');
        } else {
            var tags = [];
        }
        var _html = '';
        if (tags.length) {
            for (i=0; i<tags.length; i++) {
                _html += tagli.replace('{tag}', tags[i]);
            }
        }
        $(newtag).before(_html);
        $(tagul).show();
        $this.hide(); // init finished

        var addTag = function(tag) {
            if (tag && -1 == tags.indexOf(tag)) {
                tags.push(tag);
                $this.val(tags.toString());
                var _html = tagli.replace('{tag}', tag);
                $(newtag).before(_html);
            }
        }
        $(taginput).keydown(function(e) {
            var confirmKeys = {'comma': 188, 'space': 32, 'tab': 9, 'enter':13};
            var deleteKeys = {'backspace': 8, 'delete':46 };
            var keys = settings.confirm;
            for (i=0; i<keys.length; i++) {
                if (confirmKeys[keys[i]] == e.keyCode || keys[i] == e.keyCode) {
                    e.preventDefault();
                    addTag($(this).val());
                    $(this).val('');
                    break;
                }
            }
            var keys = settings.delete;
            for (i=0; i<keys.length; i++) {
                if (deleteKeys[keys[i]] == e.keyCode || keys[i] == e.keyCode) {
                    if(!$(this).val()) {
                        $(newtag).prev().remove();
                        tags.pop();
                        $this.val(tags.toString());
                    }
                    break;
                }
            }
        });
        $(tagul).delegate('span.tag', 'click', function(e) {
            var _i = tags.indexOf($(this).text());
            tags.splice(_i, 1);
            $this.val(tags.toString());
            $(this).parent().remove();
        });
        $(tagul).click(function(e) {
            $(taginput).focus();
        });
        return this;
    }
    $.extend($.fn, {
        tagbox: tagbox
    });
})(jQuery);}
