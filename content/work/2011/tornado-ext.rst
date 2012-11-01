Tornado with SQLAlchemy and wtForms
===================================

:summary: Tornado integerated with SQLAlchemy and wtForms. Make Tornado easy to use.
:date: 2011-09-20
:category: work
:public: false
:github: lepture/tornado.ext
:tags:
    - python
    - tornado


毫無疑問， Django_ 在 Python_ 的Web世界里佔有相當的分量，它不是唯一的選擇，但它是一個很好的選擇。雖然我不太用 Django 了，但是如果有對 Python 感興趣，對Web編程感興趣，面對 Python 世界里數不甚數的框架發愁時，我還是推薦 Django 。


Tornado
---------
接觸 Tornado_ 有些時候了。用，卻是最近才開始的。前幾個月，還是在學校的時候寫 FeedBundle_ ，最開始用的是 GAE_ ，後來因為效率問題又用 Tornado 重寫了一遍，算是有點小體驗吧。

不過因為為了和 GAE 的數據結構相仿，用的是 MongoDB_ ，又因為表單簡單，沒必要用表單處理的庫。還是頗為可惜的，不能算有完整的經驗。今次就不一樣了，打算寫點傳統點的東西，不得不涉及到數據庫和表單。個人對寫sql語句還是有點恐懼的，而且 ORM 方便好用（sql偏執狂可以無視），於是搜索了一下，結果不太理想，只好自己動手了。

之前用過的框架有 Django 、 web.py_ 、 GAE 。其中 Django 已經甚麼都有， GAE 的數據庫比較特別，不過很好用。 web.py 有表單處理，當時數據庫的python lib用的 SQLAlchemy_ 。

至於我為甚麼用 Tornado ，我不想多說，也不想評論框架的優劣，選擇你喜歡的吧。

SQLAlchemy
-----------
如何把 SQLAlchemy 整合進來是我首先考慮的問題，當時搜索到了 `Integrating SQLAlchemy with Tornado <https://www.aliway.com/read.php?fid=20&tid=112655>`_ ，看了一下，基本等於沒整合。我心目中的整合，至少要可以這樣用： ``User.filter(username='lepture')`` 。

`Armin Ronacher <http://lucumr.pocoo.org>`_ 是個精力旺盛的人，是 pocoo_ 最活躍的開發者。 `他的Github <http://github.com/mitsuhiko>`_ 里有很多好東西，從裡面淘到了點想法，錄於下。


.. sourcecode:: python

    class SQLAlchemy(object):
        """
            db = SQLAlchemy("sqlite:///test.sqlite", True)

            from sqlalchemy import Column, String

            class User(db.Model):
                username = Column(String(16), unique=True, nullable=False, index=True)
                password = Column(String(30), nullable=False)

            User.query.filter_by(username='yourname')
        """

        def __init__(self, database, debug=False, **kwargs):
            self.engine = create_engine(database, convert_unicode=True, echo=debug)
            self.session = self.create_session()
            self.Model = self.create_model()

        def create_session(self):
            session = sessionmaker(bind=self.engine, query_cls=DjangoQuery)
            return scoped_session(session)

        def create_model(self):
            base = declarative_base(cls=Model, name='Model')
            base.query = self.session.query_property()
            return base

        def create_db(self):
            return self.Model.metadata.create_all(self.engine)


再加上Armin Ronacher的 `sqlalchemy-django-query <https://github.com/mitsuhiko/sqlalchemy-django-query>`_ 就相當好用了。

source code at: https://github.com/lepture/tornado.ext/blob/master/database.py

wtForms
--------
表單處理是在 formencode_ 和 wtForms_ 之間選擇的。選擇 wtForms 是因為寫起來很 Django ，哦，他們說其實是 Django 借鑒的他們。

對於和 Tornado 的整合，其實就是要把 Tornado 的輸出作一點處理。下面是我的方案：

.. sourcecode:: python

    import re
    from tornado.escape import to_unicode
    from wtforms import Form as wtForm

    class Form(wtForm):
        """
        Using this Form instead of wtforms.Form

        Example::

            class SigninForm(Form):
                email = EmailField('email')
                password = PasswordField('password')

            class SigninHandler(RequestHandler):
                def get(self):
                    form = SigninForm(self.request.arguments)

        """
        def __init__(self, formdata=None, obj=None, prefix='', **kwargs):
            super(Form, self).__init__(formdata, obj, prefix, **kwargs)

        def process(self, formdata=None, obj=None, **kwargs):
            if formdata is not None and not hasattr(formdata, 'getlist'):
                formdata = TornadoArgumentsWrapper(formdata)
            super(Form, self).process(formdata, obj, **kwargs)

    class TornadoArgumentsWrapper(dict):
        def __getattr__(self, key):
            try:
                return self[key]
            except KeyError:
                raise AttributeError

        def __setattr__(self, key, value):
            self[key] = value

        def __delattr__(self, key):
            try:
                del self[key]
            except KeyError:
                raise AttributeError

        def getlist(self, key):
            try:
                values = []
                for v in self[key]:
                    v = to_unicode(v)
                    if isinstance(v, unicode):
                        v = re.sub(r"[\x00-\x08\x0e-\x1f]", " ", v)
                    values.append(v)
                return values
            except KeyError:
                raise AttributeError

source code at: https://github.com/lepture/tornado.ext/blob/master/forms.py

Else
-------
更多有用的東西請移步 https://github.com/lepture/tornado.ext

Bug report 請在github上開 issue。謝謝。

BTW，Web並不是 Python 的所有，如果你用 Python ，但是又一直待在 Django 的世界里，現在是時候出來了，瞭解一下 Python 的其它方面。例如這個網站，它是純靜態的，從 restructuredText_ 生成為html，其間的工具Felix Felicis( liquidluck_ )就是用 Python 寫的。



.. _Python: http://www.python.org
.. _Django: http://www.djangoproject.com
.. _Tornado: http://github.com/facebook/tornado
.. _web.py: http://webpy.org
.. _GAE: http://code.google.com/appengine/
.. _FeedBundle: http://www.feedbundle.com
.. _MongoDB: http://www.mongodb.org
.. _SQLAlchemy: http://www.sqlalchemy.org
.. _formencode: http://formencode.org
.. _wtForms: http://wtforms.simplecodes.com
.. _restructuredText: http://docutils.sourceforge.net
.. _liquidluck: http://github.com/lepture/liquidluck
.. _pocoo: http://www.pocoo.org
