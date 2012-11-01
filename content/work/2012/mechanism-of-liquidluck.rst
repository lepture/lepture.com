Mechanism of Felix Felicis
==========================

:summary: 
    This post will explain how Felix Felicis works and how to write plugins
    (actually, there is no such thing in Felix Felicis).
:date: 2012-01-02 22:40
:category: work
:github: lepture/liquidluck
:tags:
    - python
    - project


This post will explain how Felix Felicis works and how to write plugins
(actually, there is no such thing in Felix Felicis).

Introduction
--------------

Felix Felicis (aka liquidluck) is a simple lightweight static blog generator.
It supports markup of restructedText_ and markdown_.

The name `Felix Felicis` is somewhat a magic liquid that Harry Porter won from his teacher.
The common name of `Felix Felicis` is `liquidluck`.

In case you mess it up, it's a little bit like Mercurial and hg.

For a real introduction, visit the `project page <http://lepture.com/project/liquidluck>`_ .

.. _restructedText: http://docutils.sourceforge.net/rst.html
.. _markdown: http://daringfireball.net/projects/markdown/


How it works
------------

If you have an interesting in reading the code. I strongly suggest you start at cli.py.

The progress of building site:

1. load config file

   Config file is in ini format. If you don't like ini, vote it for other format at
   https://github.com/lepture/liquidluck/issues/2

   Config options can be found at Configure_

   Code at: ``liquidluck.cli.init_config``

2. load all files in your postdir

   You can define your postdir in Configure. The default directory is *content*.

   In your postdir, there are two parts of files -- *posts and pure files* .

   Posts usually have an extension of md, mkd, markdown, rst etc..
   Pure files are the rest.

   All posts will be rendered by its reader, and they will be loaded in the memory.
   All files's paths will be stored in the memory.

   Code at: ``liquidluck.cli.init_post``

3. loading readers and run the ``start`` function of a reader

   Config your readers in your config file with section ``[readers]``
   By defaults, it will load both of the two readers. mkd and rst.
   You can disable it with a blank value: ``mkd =`` 

   Default value of mkd: ``mkd = liquidluck.readers.mkd.MarkdownReader``

   All readers are the subclass of ``liquidck.readers.Reader`` . A reader must have a
   ``support_type`` and ``parse_post`` functions.
   
   ``support_type`` returns a string, tuple or list.
   The value it returns is(are) suffix of the supported files.

   ``parse_post`` returns an object of a parsed post which contains title, content, date
   and other meta info.

   ``start`` function is optional. In case you need something to be loaded before the
   writers start.

4. loading writers and run the ``start`` function of a writer

   Just like above, you can config your writers with section ``[writers]``
   Find more information at Configure_ .

   You can load things with ``start`` function. Writer usually attach stuffs on namespace
   at this time. I will explain Namespace_ later.
   
   More on Writers_ will be discussed later.

5. loading writers and run the ``run`` function of a writer

   At this point, all data are loaded. The ``run`` function will write files to your
   deploydir.

   For pure files which I mentioned earlier, will be handled by
   ``liquidluck.writers.default.FileWriter``, which just copy files to the deploydir,
   it's a good and simple beginning for your studying how to write a ``Writer``.

   All posts are stored in **ns.storage.posts** , you can just loop them, and do whatever
   you want in your writers' run function.

.. _Configure: https://github.com/lepture/liquidluck/wiki/Configure


Writers
---------

The default writers can do everything that a usual blog did.
But you may still want to write your own writer.

All writers are the subclass of ``liquidluck.writers.Writer``.

The ``Writer`` has initialized a jinja template environment for you,
it provided a ``write`` function for you to write files.
It also provided some alias like *postdir*, *deploydir* for convenient.

Specify a ``writer_type`` in your writer is appreciable. And every writer
must contain a ``run`` function.

There are some mixin in *liquidluck/writers/__init__.py* , they are really helpful.

Namespace
----------

The global namespace that you can use everywhere is **ns** in *liquidluck.namespace*.

Take a look at ``liquidluck.namespace.ns`` , it has lots of default values. The most
significate one is **storage**. Every writers will use the data on ns.storage.

Some data are attached to storage at init, others maybe attached at writers run function,
or readers run function. ``ns.storage.status`` is attached data for global use in template.

Except storage, the others are information of configuration. They are explained earlier,
If you want to know more about it, read Configure_ .


More
-------

Using logger instead of logging. Handle unicode with ``liquidluck.utils.to_unicode`` .

If you want write your own theme, you should have a little knowledge of jinja_ , 
a list of available variables at https://github.com/lepture/liquidluck/wiki/Template .

Have a bug? Report it with `Github Issue <https://github.com/lepture/liquidluck/issues/new>`_ .

Contact me with `Email <lepture@me.com>`_ , English and Chinese are accepted.

.. _jinja: http://jinja.pocoo.org/docs/templates/
