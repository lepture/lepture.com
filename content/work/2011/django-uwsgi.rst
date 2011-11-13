Django with uwsgi
==================

:summary: Django with uwsgi, virtualenv, supervisor and nginx
:date: 2011-08-29
:folder: work
:tags:
    - python
    - django
    - nginx
    - virtualenv


至于fastcgi和uwsgi孰优孰劣不在本文的讨论范围，自然我个人偏向于uwsgi。本文只介绍基本的环境搭建与配置。

virtualenv
-----------

virtualenv_ 是利器，建议使用。与 pip_ 搭配，构建 python_ 虚拟环境，方便你在各个版本间切换。

+ 安装 pip (pip 是 easy\_install 的代替者): ``easy_install pip``
+ 安装 virtualenv : ``pip install virtualenv``
+ 创建python虚拟环境: ``virtualenv django``
+ 创建干净的python虚拟环境: ``virtualenv django --no-site-packages``
+ 启用python虚拟环境: ``source django/bin/active``
+ 安装python包到该环境: ``pip install Django``

更多信息请自行查看文档:

+ ``virtualenv --help``
+ ``pip --help``


django
-------

如果你压根不用django，你可以离开了。

+ 创建项目文件夹: ``mkdir helloworld``
+ 新建django项目: ``django-admin.py startproject project``
+ 新建wsgi.py文件: ``touch wsgi.py``

编辑wsgi.py:

.. sourcecode:: python

    #!/usr/bin/env python
    import os
    os.environ['DJANGO_SETTINGS_MODULE'] = 'project.settings'
    import django.core.handlers.wsgi
    application = django.core.handlers.wsgi.WSGIHandler()


更多 django_ 信息请查看网上文档。

uwsgi
------

wsgi_ 是 web server gateway interface 的缩写，详情请参阅 pep333_ 。

+ 安装uwsgi: ``pip install uwsgi``
+ 一个简单的helloworld uwsgi demo 见: `uwsgi Quickstart`_
+ 创建uwsgi的配置文件: ``touch uwsgi.ini``

编辑uwsgi.ini，以下是 helloworld_ 中我的配置，请参阅文档修改。

.. sourcecode:: ini

    [uwsgi]
    home = /Users/lepture/Library/Python/django
    chmod-socket = 666
    socket-timeout = 5
    master = true
    max-requests = 1000
    logto = /tmp/uwsgi.log
    file = wsgi.py

注意，其中 home 就是你的虚拟环境的path，如果你不用 virtualenv，可去掉该选项。

supervisor
-----------

supervisor_ 是一个进程管理系统，挺好用的。

+ 安装supervisor: ``pip install supervisor``
+ 创建supervisor的配置文件: ``touch supervisord.conf``

编辑supervisord.conf:

.. sourcecode:: ini

    [program:django-8000]
    command = uwsgi --ini uwsgi.ini --socket 127.0.0.1:8000
    stopsignal=QUIT
    autostart=true
    autorestart=true
    stdout_logfile=/tmp/out-8000.log
    stderr_logfile=/tmp/err-8000.log
    exitcodes=0,1,2

nginx
-------

nginx_ 就不用多介绍了。不了解的话，请访问官网。

nginx_ 最新的版本已经自带了 uwsgi_ 模块，如果你的 nginx 没有 uwsgi 模块，请下载编译最新版。

完整demo呈现，请下载 helloworld_ 。

Get rid of fastcgi, why not try wsgi ?

.. _python: http://www.python.org
.. _django: https://docs.djangoproject.com
.. _virtualenv: http://www.virtualenv.org/en/latest/index.html
.. _pip: http://pypi.python.org/pypi/pip
.. _wsgi: http://www.python.org/dev/peps/pep-0333/
.. _pep333: http://www.python.org/dev/peps/pep-0333/
.. _uwsgi: http://projects.unbit.it/uwsgi/wiki
.. _uwsgi Quickstart: http://projects.unbit.it/uwsgi/wiki/Quickstart
.. _supervisor: http://supervisord.org/
.. _nginx: http://wiki.nginx.org
.. _helloworld: http://d.pr/5MMi
