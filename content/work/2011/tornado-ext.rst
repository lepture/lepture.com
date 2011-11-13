Tornado with SQLAlchemy and wtForms
===================================

:summary: Tornado integerated with SQLAlchemy and wtForms. Make Tornado easy to use.
:date: 2011-09-20
:folder: work
:tags:
    - python
    - tornado


毫无疑问， Django_ 在 Python_ 的Web世界里占有相当的分量，它不是唯一的选择，但它是一个很好的选择。虽然我不太用 Django_ 了，但是如果有对 Python_ 感兴趣，对Web编程感兴趣，面对 Python_ 世界里数不甚数的框架发愁时，我还是推荐 Django_ 。


Tornado
---------
接触 Tornado_ 有些时候了。用，却是最近才开始的。前几个月，还是在学校的时候写 FeedBundle_ ，最开始用的是 GAE_ ，后来因为效率问题又用 Tornado_ 重写了一遍，算是有点小体验吧。

不过因为为了和 GAE_ 的数据结构相仿，用的是 MongoDB_ ，又因为表单简单，没必要用表单处理的库。还是颇为可惜的，不能算有完整的经验。今次就不一样了，打算写点传统点的东西，不得不涉及到数据库和表单。个人对写sql语句还是有点恐惧的，而且 ORM 方便好用（sql偏执狂可以无视），于是搜索了一下，结果不太理想，只好自己动手了。

之前用过的框架有 Django_ 、 web.py_ 、 GAE_ 。其中 Django_ 已经什么都有， GAE_ 的数据库比较特别，不过很好用。 web.py_ 有表单处理，当时数据库的python lib用的 SQLAlchemy_ 。

至于我为什么用 Tornado_ ，我不想多说，也不想评论框架的优劣，选择你喜欢的吧。

SQLAlchemy
-----------
如何把 SQLAlchemy_ 整合进来是我首先考虑的问题，当时搜索到了 `Integrating SQLAlchemy with Tornado <https://www.aliway.com/read.php?fid=20&tid=112655>`_ ，看了一下，基本等于没整合。我心目中的整合，至少要可以这样用： ``User.filter(username='lepture')`` 。

`Armin Ronacher <http://lucumr.pocoo.org>`_ 是个精力旺盛的人，是 pocoo_ 最活跃的开发者。 `他的Github <http://github.com/mitsuhiko>`_ 里有很多好东西，从里面淘到了点想法，录于下。


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


再加上Armin Ronacher的 `sqlalchemy-django-query <https://github.com/mitsuhiko/sqlalchemy-django-query>`_ 就相当好用了。

source code at: https://github.com/lepture/tornado.ext/blob/master/database.py

wtForms
--------
表单处理是在 formencode_ 和 wtForms_ 之间选择的。选择 wtForms_ 是因为写起来很 Django_ ，哦，他们说其实是 Django_ 借鉴的他们。

对于和 Tornado_ 的整合，其实就是要把 Tornado_ 的输出作一点处理。下面是我的方案：

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
更多有用的东西请移步 https://github.com/lepture/tornado.ext

Bug report 请在github上开 issue。谢谢。

BTW，Web并不是 Python_ 的所有，如果你用 Python_ ，但是又一直待在 Django_ 的世界里，现在是时候出来了，了解一下 Python_ 的其它方面。例如这个网站，它是纯静态的，从 restructuredText_ 生成为html，其间的工具Felix Felicis( liquidluck_ )就是用 Python_ 写的。



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
