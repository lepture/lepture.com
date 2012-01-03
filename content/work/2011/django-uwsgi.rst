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


至於fastcgi和uwsgi孰優孰劣不在本文的討論範圍，自然我個人偏向於uwsgi。本文只介紹基本的環境搭建與配置。

virtualenv
-----------

virtualenv_ 是利器，建議使用。與 pip_ 搭配，構建 python_ 虛擬環境，方便你在各個版本間切換。

+ 安裝 pip (pip 是 easy\_install 的代替者): ``easy_install pip``
+ 安裝 virtualenv : ``pip install virtualenv``
+ 創建python虛擬環境: ``virtualenv django``
+ 創建乾淨的python虛擬環境: ``virtualenv django --no-site-packages``
+ 啓用python虛擬環境: ``source django/bin/active``
+ 安裝python包到該環境: ``pip install Django``

更多信息請自行查看文檔:

+ ``virtualenv --help``
+ ``pip --help``


django
-------

如果你壓根不用django，你可以離開了。

+ 創建項目文件夾: ``mkdir helloworld``
+ 新建django項目: ``django-admin.py startproject project``
+ 新建wsgi.py文件: ``touch wsgi.py``

編輯wsgi.py:

.. sourcecode:: python

    #!/usr/bin/env python
    import os
    os.environ['DJANGO_SETTINGS_MODULE'] = 'project.settings'
    import django.core.handlers.wsgi
    application = django.core.handlers.wsgi.WSGIHandler()


更多 django_ 信息請查看網上文檔。

uwsgi
------

wsgi_ 是 web server gateway interface 的縮寫，詳情請參閱 pep333_ 。

+ 安裝uwsgi: ``pip install uwsgi``
+ 一個簡單的helloworld uwsgi demo 見: `uwsgi Quickstart`_
+ 創建uwsgi的配置文件: ``touch uwsgi.ini``

編輯uwsgi.ini，以下是 helloworld_ 中我的配置，請參閱文檔修改。

.. sourcecode:: ini

    [uwsgi]
    home = /Users/lepture/Library/Python/django
    chmod-socket = 666
    socket-timeout = 5
    master = true
    max-requests = 1000
    logto = /tmp/uwsgi.log
    file = wsgi.py

注意，其中 home 就是你的虛擬環境的path，如果你不用 virtualenv，可去掉該選項。

supervisor
-----------

supervisor_ 是一個進程管理系統，挺好用的。

+ 安裝supervisor: ``pip install supervisor``
+ 創建supervisor的配置文件: ``touch supervisord.conf``

編輯supervisord.conf:

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

nginx_ 就不用多介紹了。不瞭解的話，請訪問官網。

nginx_ 最新的版本已經自帶了 uwsgi_ 模塊，如果你的 nginx 沒有 uwsgi 模塊，請下載編譯最新版。

完整demo呈現，請下載 helloworld_ 。

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
