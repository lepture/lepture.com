Fix mysql has gone away with SQLAlchemy in tornado
===================================================

:folder: work
:date: 2012-02-09 21:15
:github: lepture/tornado.ext
:tags:
    - python
    - mysql
    - tornado


I just started a project at http://start.lepture.com , which is built on tornado with database
of mysql. 

It's a new project, and there is no user. Therefore, the database can be inactive for a long
time, it then occurred to me that mysql has gone away!

I am using SQLAlchemy as the ORM engine, according to the document_ , I added ``pool_recycle=3600`` , but it didn't work. And I don't know why. It seems that many a people has such a problem
when I searched  Stack Overflow.

Then I figured it out, I am using tornado! I can set a PeriodicCallback to ping mysql every
pool recycle time, so that mysql can not go away.

I have written a `wrap for SQLAlchemy <http://lepture.com/work/tornado-ext/>`_ to make it a
little Django like. Then I add this feature to it as:

.. sourcecode:: python

    class SQLAlchemy(object):
        """
        Example::

            db = SQLAlchemy("mysql://user:pass@host:port/db", pool_recycle=3600)

            from sqlalchemy import Column, String

            class User(db.Model):
                username = Column(String(16), unique=True, nullable=False)
                password = Column(String(30), nullable=False)

            >>> db.create_db()
            >>> User.query.filter_by(username='yourname')

        """
        def __init__(self, database, **kwargs):
            self.engine = create_engine(database, **kwargs)
            self.session = self.create_session()
            self.Model = self.create_model()
            if 'pool_recycle' in kwargs:
                # ping db, so that mysql won't goaway
                PeriodicCallback(self._ping_db, kwargs['pool_recycle'] * 1000).start()

        def create_session(self):
            session = sessionmaker(bind=self.engine, query_cls=DjangoQuery)
            return scoped_session(session)

        def create_model(self):
            base = declarative_base(cls=Model, name='Model')
            base.query = self.session.query_property()
            return base

        def create_db(self):
            return self.Model.metadata.create_all(self.engine)

        def _ping_db(self):
            self.session.execute('show variables')


You may have a little confuse, have a better understanding with the source code at Github_ .

.. _document: http://docs.sqlalchemy.org/en/latest/dialects/mysql.html
.. _Github: https://github.com/lepture/tornado.ext/blob/master/database.py
