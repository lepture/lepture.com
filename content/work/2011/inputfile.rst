Styling a file input
===========================

:summary: 
    It is a bit annoying for styling a file input field. And I will cover it with a javascript way, not to style it. Instead, we hide it.
    
:date: 2011-11-08
:category: work
:tags:
    - javascript
    - css
    - html

**This is outdated. DON'T READ IT.**

It is a bit annoying for styling a file input field. You can use ``opacity`` property to style it with css, but the result is not always graceful.

I have learnt this solution from bitbucket_ when I uploaded my ssh key. You can browser the demo_ for a quick look.

The rest of the article will explain how it works.

First, write a regular form, a real working form, in case something bad happened, and your form will still work well.

Next we will not (and never) style the file input field. Instead, we hide it, not the ``display: none`` way.

.. sourcecode:: css

    #yourfileinput {
        position: absolute;
        left: -9999px;
    }

If we hide it with ``display:none``, we can not trigger its click event. In the demo_, I added a class to hide the element.

Change our explaination on the button, so that people can understand what they should do. ``$("#upload-button").text("Choose file")``.

When someone click the button, they don't mean to submit the form, they want to choose a file. At this moment, we can trigger the file input field, and this is why we can't use ``display:none``. 

.. sourcecode:: js

    $("#upload-button").click(function(){
        if($('#upload-file').val()){
            return true;
        }
        $("#upload-file").click()
        return false;
    });

But if someone has chosen a file, he wants to submit, so we should check whether the file input field has a value.

To make the form more elegent:

.. sourcecode:: js

    $("#upload-file").change(function(){
        var file = $('#upload-file').val();
        if(file){
            // fix on webkit, and IE
            file = file.substr(file.lastIndexOf("\\")+1);
            $("#file-name").text(file);
            $("#upload-button").text("Upload file");
        }
    });

So people will know what they are uploading.

For webkit browsers like Safari and Chrome, the value path of the file input field is somewhat a ``C:\fakepath\file`` . WTF, you are browsing webpage with Safari on a Mac, how could there be a ``C:`` ! So I have to fix it with: ``file = file.substr(file.lastIndexOf("\\")+1)``

You need to do more, if people want to cancel their choice or make another choice. It's not that difficult, and I will not cover it in this post.

Related reading: PPK once wrote an article about `Styling an input type="file" <http://www.quirksmode.org/dom/inputfile.html>`_ . 

.. _demo: http://lepture.com/demo/click-file-form/
.. _bitbucket: http://bitbucket.org
