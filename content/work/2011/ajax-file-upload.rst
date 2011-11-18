Ajax file uploading
===========================

:summary: 
    The ajax file uploading is not really an ajax way, instead, it behaves like ajax. But we don't send any XMLHttpRequest.

:date: 2011-11-17
:folder: work
:tags:
    - javascript
    - jquery

For professional visitors, you may want to have a quick look at pure code. Don't waste your time here, just `go ahead <http://d.pr/fIvq>`_ ! I wrote it in a jQuery plugin way.

Front End
----------
I will first appologize for my untruthful title, it's not really an ajax way, it just behaves like ajax, but we didn't even send any XMLHttpRequest.

Yes, it's the iframe way as usual.

I had no idea about `target` attribute in the form. When this attribute is discovered, I find it not that hard to understand the iframe way.

.. sourcecode:: html

    <form action="" method="post" enctype="multipart/form-data" target="demo"></form>
    <iframe name="demo" frameborder="0"></iframe>

When we post the form, the response will appear in the iframe named "demo". How do we handle file uploading asynchronous ? Time matters.

1. before submit, add `target` attribute to the form, and create an iframe named as the ``target``.
2. bind callback function to iframe load event. and remove the iframe when we get the response.
3. sumbit the form

Code Example
~~~~~~~~~~~~
.. sourcecode:: javascript

    if(window.jQuery){(function($){
        var iframeUploader = function(options) {
            var settings = {
                'iframeID': 'ifrUploader',
                'callback': null
            }
            if (options) {
                $.extend(settings, options)
            }
            $(this).submit(function(){
                $(this).attr('target', 'iframeUploader');
                var iframeHTML = '<iframe id="' + settings.iframeID + '" name="iframeUploader" style="display:none"></iframe>';
                $('body').append(iframeHTML);
                var iframe = $('#' + settings.iframeID).load(function(){
                    var response = iframe.contents().find('body').html();
                    if (settings.callback) {
                        settings.callback(response)
                    }
                    $(iframe).unbind('load');
                    iframe.remove();
                });
                return true;
            });
        }
        $.extend($.fn, {
            iframeUploader: iframeUploader
        });
    })(jQuery);}

How to use
~~~~~~~~~~~
.. sourcecode:: javascript

    function callback(response) {
        do something with response;
    }
    $('form').iframeUploader({
        callback: callback
    });


Server Side
------------
The Server Side should make the response easy to parse. However you can response with json [1]_ . But the body can be the format of json, which means a json formated result with ``text/html`` Content Type.

You may add an input ``<input name="iframe" value="true" type="hidden" />``  to your form, when the server side detected ``iframe=true``, it could response a little friendly for javascript parsing.

Together with `Styling a file input field <http://lepture.com/work/inputfile/>`_, file uplading can be much more elegent.

.. [1] Content Type: application/json
