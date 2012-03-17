How I develop a tornado project
===============================

:date: 2012-03-13 17:13
:folder: work
:tags:
    - python
    - tornado
    - vim


For the past year, I have been working on all my web projects in tornado_ ,
in order to make it easier to manage a project, I have build some useful tools,
and I would like to share some with you which, I hope, will sort of inspire you.

I did not invent it myself, thanks to the great project of poweredsites_ by felinx_.
I learned a lot from it, and I think it's a great site you should know.

Of course there are better solutions or tricks to do something that I mention.
If you know any of them, leave a comment below, or `send a tweet`_ to me.


Structure
----------

It is very important that you organize a project folders properly,
and this is the very part which I learned from poweredsites.
A glance at my tornado project folder structure:

::

    README
    License
    Makefile      <------- or fabfile.py
    setup.py      <------- hi, it's a python package
    assets/       <------- why not static?
        img/
        js/
        less/     <------- hi, I write less
    {project}/    <------- your project name
        __init__.py
        app.py
        tools.py
        urls.py
        models.py
        templates/
        handlers/
        locale/
        lib/

A live demo can be found at june_ , which is the forum engine that powered `Python China`_.
And welcome Chinese Pythoners, we need you.

Why assets
~~~~~~~~~~

A compatible WSGI application's normal static directory names are **static** and **media**,
why should I name it **assets** ?

Actually it will turn into **static**.
All images will be copied to static from assets,
all javascript will be compressed and output to static.

Assets contains the very pure source code,
as you can see above that I write less_ rather than css.
It is very important to keep your source repository clean,
then I add ``static/`` to .gitignore.

Every time when I need static, I produce it from assets.


Makefile and fabric
~~~~~~~~~~~~~~~~~~~~

How could I produce static from assets? I just ``make static``.

Makefile is an ancient tool which specify how to derive the target program.
It is a dependency-tracking build utilities, usually used in building C program.

But it's more than that, because it describes the dependencies among commands,
and supports all shell programs, I used it as a set of alias.

A example of ``make static`` in Makefile:

::

    static: copyimg less compilejs
    less:
        lessc -nc assets/less/site.less > static/css/site.css

    compilejs:
        uglifyjs -nc assets/js/jquery.js > static/js/app.js
        uglifyjs -nc assets/js/site.js >> static/js/app.js

    copyimg:
        copy -r assets/img/* static/img/


If you need a more powerful tools, you should try fabric_.

Fabric is a Python library and command-line tool for streamlining the use of
SSH for application deployment or systems administration tasks.

You can learn more about fabric by reading `fabric docs`_.

Python package
~~~~~~~~~~~~~~~

Even if it's a web project, I would make it a python package that you can install.

By ``python setup.py install``, it will create some command-line tools for easier deployment.
Take june_ as an example, (actually you will be able to ``pip install june`` in the future)
it will create ``june.server`` and ``june.tools`` for you. With ``june.tools`` you can easily
create config file, database, and super admin user. With ``june.server`` you can easily set
up a server.

If you have no idea on how to create a python package, check setuptools_.
The official distribution tools is Distutils_ , but setuptools is easier.

The very heart of a distribution is ``setup.py``, an example setup.py of june:

.. sourcecode:: python

    #!/usr/bin/env python
    # -*- coding: utf-8 -*-

    from setuptools import setup, find_packages

    setup(
        name='june',
        version='1.0',
        author='Hsiaoming Young',
        author_email='lepture@me.com',
        url='http://lepture.com/project/june',
        packages=find_packages(),
        description='June: a forum',
        entry_points={
            'console_scripts': [
                'june.server= june.app:run_server',
                'june.tools= june.tools:main',
            ],
        },
        install_requires=[
            'python-memcached',
            'markdown',
            'pygments',
            'tornado',
            'SQLAlchemy',
        ],
        include_package_data=True,
        license='BSD License',
    )


If you are not distributing your web project, try to. By the way, you really should develop
with virtualenv_. You will find it very useful.

Tools
~~~~~~

It's a pity to waste your time in creating a lot of folders and touching lots of files,
and then copying some code to them.
I wrote a snippet code called tornadmin.py_ to do the job.

The name ``tornadmin = tornado + admin``. It's not powerful enough, but I will improve it.


Database and Forms
-------------------

Tornado has a default mysql database, but no form frameworks.

Database
~~~~~~~~

I cannot stand the stupid Structured Query Language (aka SQL).
I am using SQLAlchemy instead of raw sql. I know it's slower than raw sql,
but most web sites are just small enough, they are not and they will not be facebook.

But SQLAlchemy is not that easy to use, I have written a wrapper snippet code that makes
it a little django-like. And the snippet code also provides a master-slave database solution,
`MySQL and SQLAlchemy`_ tells more on this topic.

Thanks to `Armin Ronacher`_ for the sweet piece of DjangQuery,
though the code has some bugs (I fixed it in my code).

Detail of the code can be found at database.py_ .

Forms
~~~~~~

wtForms and FormEncode are the only form frameworks that I have tried.
FormEncode is faster than wtForms, but wtForms is more django-like that it is easier to use.

Solution on how to implement wtForms to tornado can be found at forms.py_ .

Actually I don't use wtForms now, I have written another form framework called tforms_ which
is a clone of wtForms.

And why should I create tforms? It solved many unicode bugs that wtForms has, and provides
a locale support solution for tornado.

Oh, I have not implement it in June, because June's form is not that complex.
And take your own risk to import it.

PyLint
---------

I always think it's significant to have a good code style,
the pretty layout of the code makes me happy. PEP8 has described a style guide for python,
and I am always checking my python code style with it.

You can install pep8: ``pip install pep8`` , and valide your code with the command ``pep8``.

But pylint is more than that, if you are an IDE user, your IDE may tell you that you have
imported an unused module, but vim will not. Another fabulous lint tools is pyflakes, it
will tell you more than code style.

I have introduced pep8 and pyflakes, and now I will present you flake8 which is a combination
of pep8 and pyflakes. Install it with ``pip install flake8``.

flake8 for Vim
~~~~~~~~~~~~~~

I am an addictive vim user, and if you are too, the good news is that you can implement
flake8 in vim.

With the very fantastic syntax checking plugin syntastic_ , you can easily fix your stupid
syntax errors. Just install it, and edit your .vimrc:

::

    let g:syntastic_python_checker="path/to/bin/flake8"

By the way, manage your vim plugin with Pathogen_ or Vundle_ . For Chinese visitors,
`this post`_ will tell how I manage my vim plugins.

**EDIT: flake8 is the default syntax checker in syntastic now. Don't add the code.**


Conclusion
-----------

I haven't written such long a post yet, and I hope it will at least help you a little.
I learned many things from others' code, and they really inspire me.

My poor English makes me hard to express the very thought inside me, however, a coder
can find the value in the code. Follow me on Github_ , code tells more.


.. _tornado: http://www.tornadoweb.org
.. _poweredsites: http://poweredsites.org
.. _felinx: http://feilong.me
.. _`send a tweet`: https://twitter.com/lepture
.. _june: https://github.com/lepture/june
.. _`Python China`: http://python-china.org
.. _less: http://lesscss.org
.. _fabric: http://fabfile.org
.. _`fabric docs`: http://docs.fabfile.org
.. _syntastic: https://github.com/scrooloose/syntastic
.. _tornadmin.py: https://github.com/lepture/dotfiles/blob/master/dotpy/tornadmin.py
.. _setuptools: http://packages.python.org/an_example_pypi_project/setuptools.html
.. _Distutils: http://docs.python.org/distutils/index.html
.. _`MySQL and SQLAlchemy`: http://lepture.com/work/mysql-sqlalchemy/
.. _`Armin Ronacher`: http://lucumr.pocoo.org/
.. _database.py: https://github.com/lepture/tornado.ext/blob/master/database.py
.. _forms.py: https://github.com/lepture/tornado.ext/blob/master/forms.py
.. _tforms: https://github.com/lepture/tforms
.. _Pathogen: http://github.com/tpope/vim-pathogen
.. _Vundle: https://github.com/gmarik/vundle
.. _`this post`: http://lepture.com/work/manage-vim/
.. _Github: https://github.com/lepture
.. _virtualenv: http://www.virtualenv.org
