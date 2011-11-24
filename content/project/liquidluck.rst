Felix Felicis
=============

:template: page.html
:date: 2011-11-23
:folder: project
:public: false
:nav: home
:github: lepture/liquidluck
:style:
    .page-content ul {list-style-type: square; margin-left: 1.2em;}


Felix Felicis (aka liquidluck) is a simple lightweight static blog generator. It supports markup of restructedText_ and markdown_.

Features
---------

+ **Light Weight**

  It's really simple and lightweight, and requires less (only 4) libraries.

+ **Fast**

  It's static, it's really fast.

+ **Organizable**

  You can organize your articles in the way you like, and produce the blog in another way you like.

  Take a look at `this blog's repo <https://github.com/lepture/lepture.com>`_ for an example.

+ **Flexible**

  You can write one post in restructedText_ , and write another post in markdown_. And in the future, if we supports more markup, you can still mixin markup as your wish.


Install
--------

Install the very alpha version 0.1::

    pip install liquidluck

If you don't have pip installed, try::

    easy_install liquidluck


Write
-------

Open your terminal, cd into your blog directory and run ``liquidluck``. It will promot asking you: would you like to create a Felix Felicis repo.

Type Y, or just enter. Then check your directory again. Write your article in the content directory that liquidluck just created.

Run ``liquidluck`` command again in the terminal, your blog will be created in the ``deploy`` directory.

The best way to have a clear understanding what a post file should be like:

+ https://github.com/lepture/lepture.com
+ https://github.com/CMGS/CMGS.ME
+ https://github.com/riverscn/micius.org

More about Writting: https://github.com/lepture/liquidluck/wiki/Write

Themes
--------

If you don't like the default theme, you can write a theme yourself. You will need take a look at `How to write your own template <https://github.com/lepture/liquidluck/wiki/Template>`_

There are two more themes available at `Theme Gallery <https://github.com/lepture/liquidluck/tree/themes>`_

I am using the *liquid* one.

If you have any questions, ask me on `twitter <http://lepture.com/lepture>`_, join #liquidluck on irc.freenode.net

Other static blog engines
-------------------------

There are many static blog engines, I know some:

+ `Jekyll <http://github.com/mojombo/jekyll/>`_ (Ruby)

  I think post is post, template is template. But in Jekyll, your post can behave like a template.

+ `Octopress <http://octopress.org>`_ (Ruby)

  It's Jekyll, not a total new static engine.

+ `Blogofile <http://www.blogofile.com>`_ (Python)

  Didn't try this.

+ `Hyde <http://github.com/hyde/hyde>`_ (Python)

  I can't bare to write a post with a .html extension, and I can't organize posts as I wish.

  I have tried to write some plugins for hyde, but in vain. It's much easier to write a new one.

  The same problem as Jekyll.


Changelog
---------

+ *2011.11.24* v0.1 (alpha) released

.. _restructedText: http://docutils.sourceforge.net/rst.html
.. _markdown: http://daringfireball.net/projects/markdown/
