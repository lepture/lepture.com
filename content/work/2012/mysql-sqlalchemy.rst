MySQL and SQLAlchemy in tornado
================================

:category: work
:date: 2012-02-09 21:15
:github: lepture/tornado.ext
:tags:
    - python
    - mysql
    - tornado


Fix MySQL has gone away
-----------------------

I just started a new project, which is built on tornado with database of mysql.

It's a new project, and there is no user. Therefore, the database can be inactive for a long
time, it then occurred to me that mysql has gone away!

I am using SQLAlchemy as the ORM engine, according to the document_ , I added ``pool_recycle=3600`` , but it didn't work. And I don't know why. It seems that many a people has such a problem
when I searched  Stack Overflow.

Then I figured it out, I am using tornado! I can set a PeriodicCallback to ping mysql every
pool recycle time, so that mysql can not go away.

I have written a `wrap for SQLAlchemy <http://lepture.com/work/tornado-ext/>`_ to make it a
little Django like. Then I add this feature to it.

.. sourcecode:: python

    if 'pool_recycle' in kwargs:
        # ping db, so that mysql won't goaway
        PeriodicCallback(self._ping_db, kwargs['pool_recycle'] * 1000).start()


.. sourcecode:: python

    def _ping_db(self):
        self.session.execute('show variables')


Master Slave in SQLAlchemy
---------------------------

I hate SQL! I know that orm sucks, but SQL is killing me. I am using SQLAlchemy as the
orm engine, but it's not that easy to implement in a project. I wrote some snippets to
make it easy to use. And I introduced a new feature in the snippet today! (2012-02-28)

Master and Slave support in SQLAlchemy! What a tremendous feature. There are some answers on
Stack Overflow, but I thought mine is more elegant (maybe I am wrong).

.. sourcecode:: python
    
    @property
    def Model(self):
        if hasattr(self, '_base'):
            base = self._base
        else:
            base = declarative_base(cls=Model, name='Model')
            self._base = base
        if self.slaves:
            slave = random.choice(self.slaves)
            base.query = slave.query_property()
        else:
            base.query = self.session.query_property()
        return base


You may have a little confuse, have a better understanding with the source code at Github_ .

**You must read the whole code before continuing!**

After it is integrated in your project! You can read data from slave database with:

``Member.query.filter_by(username='lepture')``

For writing data into master database, using ``db.session.add(model)`` .

For updating data, you should query the model with:

``db.session.query(Member).filter_by(username='lepture')``

Always remember, ``db.session`` is master, ``Model.query`` is slave,
``Model.query`` is read-only!


.. _document: http://docs.sqlalchemy.org/en/latest/dialects/mysql.html
.. _Github: https://github.com/lepture/tornado.ext/blob/master/database.py
