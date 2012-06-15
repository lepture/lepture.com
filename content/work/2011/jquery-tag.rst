jQuery Tags
============

:summary: jquery.tag.js, beautiful tags ui plugin for jquery
:date: 2011-06-22
:folder: work
:public: false
:tags:
    - javascript
    - design
    - jquery


I am recently working on FeedBundle_ , it's a personal project, I will cover it in the next post.

There is a tag property of each bundle. I didn't make any ui effect on tags at first, it's just an **input**, and users should use comma to separate each tag. Then I decided to write a plugin to make my tags more beautiful.

First, I will not rewrite my HTML. Second, I should be able to access tags even if I disable javascript.

My HTML in FeedBundle_ like this:

.. sourcecode:: html

    <div class="icon-tags">
        <input type="text" name="tags" class="tag-input" />
    </div>

I want it being:

.. sourcecode:: html

    <div class="icon-tags">
        <ul class="tagbox">
            <li><span class="tag">demo</span></li>
            <li class="new-tag"><input type="text" /></li>
        </ul>
        <input type="text" name="tags" class="tag-input" />
    </div>

Creating these dom is pretty simple, but at first, we must have something in account:

1. init tags
2. create dom and then hide the tag-input
3. no repeat tag


And the final look is:

.. image:: http://lepture.com/demo/img/tags.png
   :alt: tags

**Usage**

.. sourcecode:: javascript

    $(seletor).tagbox({
        'confirm': ['comma', 'tab', 'space' ,'enter'], //optional
        'delete': ['backspace', 'delete'] //optional
    });

You can have a look at the `DEMO <http://lepture.com/demo/tags/>`_ , just have a try.

.. _FeedBundle: http://www.feedbundle.com
