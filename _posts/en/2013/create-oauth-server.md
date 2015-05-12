# Create an OAuth Server

- date: 2013-11-21 16:30
- tags: oauth, python, flask
- github: lepture/flask-oauthlib

A guide on creating an OAuth server, both OAuth 1 and OAuth 2,
in a flavor of Flask with the help of Flask-OAuthlib.

-----

> UPDATE: I am creating a real OAuth service, which is an API based forum-like
> project, but not just for forum. You can create other things based on it.
> I am planing to start it on Kickstarter. If you have interests in supporting
> me, please email <me@lepture.com>, I will notify you when it is available on
> Kickstarter. At: 2015-05-12

I've searched the whole internet on how to create an OAuth server or
provider, but failed every time. Sometimes it was the language that stopped
me, and sometimes it was something that didn't even work.

And one day, I found [Flask-OAuthProvider][flask_provider], which was a
great piece of work. But it only implements the OAuth 1 server, and I need
the OAuth 2 part at that time. This was the first time I met OAuthlib.

> OAuthlib is the future of OAuth for Python.

A quote from Kenneth Reitz, and I can't agree more. It is really great and
RFC-aware. However, it is undervalued with ~~fewer than 450~~ stars on GitHub.
The code of [OAuthlib][oauthlib] is well written, so is the documentation,
and so is the test cases. You should star it. Everything is perfect, except
its fame. That's why I sent [a pull request][oauth.net#55] to oauth.net,
making it known by the world.

OAuthlib is far more brilliant than rauth. It is a generic, spec-compliant
library, without any specific HTTP request library. It focuses on the
definition of RFCs.

## Flask-OAuthlib

It has been 6 months since I started this project named as
[Flask-OAuthlib][flask_oauthlib], which is a successor of Flask-OAuthProvider
and Flask-OAuth.

With the great work of OAuthlib, I finished the client part in 4 days, and
made it a replacement of Flask-OAuth. It is well designed with a good
intention for compatability of the non-standard oauth servers. If you are
still using Flask-OAuth, I recommend you take this project into account.

I completed the OAuth 2 provider part at version 0.2.0, OAuth 1 provider
at version 0.3.0. And now this project has moved to version 0.4.0. So I
think it is the right time to write some introduction now.

Thanks for the help of [Ib Lundgren][ib] who is the maintainer of OAuthlib.
Thanks for the contribution of Randy Topliffe and Mackenzie B. Thompson.
You can find them on the [authors list][authors_list].

## Terminology & Knowledge

There are knowledge and terminologies that you should know. We will build
a server in Flask web framework, it is okay even if you haven't used Flask.
You can still learn something that worth the time.

Since you are going to build an OAuth server, you may need some knowledge
on these terminologies.

* **client**: also known as application, for example Twitter for iPhone
is a client
* **resource owner**: it is usually the user of a website, for example me
on Twitter: <https://twitter.com/lepture>
* **access token**: this is the key for a client to get resource from a
resource owner

There are differences between OAuth 1 and OAuth 2. A client will need some
temporary tokens for exchanging the final access tokens. They do have their
own terminologies.

### OAuth 1

OAuth 1 needs more temporary tokens, it has a request token, a verifier,
a timestamp and a nonce.

* **request token**: designed for exchanging the final access token
* **verifier**: designed for verifying the current authenticated user
* **timestamp**: a timestamp of current request
* **nonce**: a random token that makes current request unique

All these messy things are designed for authentication and security.

### OAuth 2

OAuth 2 is much easier, we do need only one **grant token** for exchanging
the final access token.

OAuth 2 requires SSL over the connection for security, it simplifies the
way for getting access token. However, SSL is also suggested on OAuth 1 in
your final production.

## Writing a Server

We need a normal server with a user system before starting the OAuth part.
Any site which has OAuth service has a user system.

Since this is just a demo, we will not create something that big. Let's
think about it, we need a user system, we need it because we want to
identify the current user. But we can skip the registration part.

This is a basic, simple, yet functional server:

```py
# coding: utf-8

from flask import Flask
from flask import session, request
from flask import render_template, redirect
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__, template_folder='templates')
app.debug = True
app.secret_key = 'secret'
app.config.update({
    'SQLALCHEMY_DATABASE_URI': 'sqlite:///db.sqlite',
})
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True)


def current_user():
    if 'id' in session:
        uid = session['id']
        return User.query.get(uid)
    return None


@app.route('/', methods=('GET', 'POST'))
def home():
    if request.method == 'POST':
        username = request.form.get('username')
        user = User.query.filter_by(username=username).first()
        if not user:
            user = User(username=username)
            db.session.add(user)
            db.session.commit()
        session['id'] = user.id
        return redirect('/')
    user = current_user()
    return render_template('home.html', user=user)


if __name__ == '__main__':
    db.create_all()
    app.run()
```

And this is the template of `home.html`:

```html+jinja
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  {% if user %}
    <p>You are {{ user.username }}</p>
  {% else %}
    <p>You are not authenticated</p>
  {% endif %}

  <p>Type any username:</p>
  <form method="post" action="/">
    <input type="text" name="username">
    <input type="submit">
  </form>
</body>
</html>
```

You can download these files from this [commit#6cfb8db](https://github.com/lepture/example-oauth1-server/tree/6cfb8db25b4427648e4229507d1649be04ddb7ef). And I will continue working on this repo, browser the revisions for more details.

## Creating OAuth 1 Server

Before implementing the actual OAuth part, we need to define an OAuth 1
Client. A client requires client_key, client_secret, redirect_uris,
default_redirect_uri and default_realms. Find more in the [Documentation][oauth1_client].

All clients are bound to a developer (developer is a user). The developer
need to fill a form and describe the application. In this simple demo, we
will skip this part. It will create a client when you visit `/client`.

```python
from flask import jsonify
from werkzeug.security import gen_salt


class Client(db.Model):
    client_key = db.Column(db.String(40), primary_key=True)
    client_secret = db.Column(db.String(55), index=True, nullable=False)

    # creator of the client
    user_id = db.Column(db.ForeignKey('user.id'))
    user = db.relationship('User')
    _realms = db.Column(db.Text)
    _redirect_uris = db.Column(db.Text)

    @property
    def redirect_uris(self):
        if self._redirect_uris:
            return self._redirect_uris.split()
        return []

    @property
    def default_redirect_uri(self):
        return self.redirect_uris[0]

    @property
    def default_realms(self):
        if self._realms:
            return self._realms.split()
        return []


@app.route('/client')
def client():
    user = current_user()
    if not user:
        return redirect('/')
    item = Client(
        client_key=gen_salt(40),
        client_secret=gen_salt(50),
        user_id=user.id,
    )
    db.session.add(item)
    db.session.commit()
    return jsonify(
        client_key=item.client_key,
        client_secret=item.client_secret
    )
```

You can find the whole new code at [commit#2cafa62](https://github.com/lepture/example-oauth1-server/tree/2cafa624dd8e82054a5208ce7c156f024d0bb109). Now, run the script
and visit `/client`.

### Implement OAuth 1 Provider

It is time to create a provider now. However, before we initialize a
provider, we need to update the configuration.

```python
app.config.update({
    'OAUTH1_PROVIDER_ENFORCE_SSL': False,
    'OAUTH1_PROVIDER_KEY_LENGTH': (10, 100),
})
```

Because we are developing on a local machine, it would be easier for us
to implement it over HTTP. This is why we set `OAUTH1_PROVIDER_ENFORCE_SSL`
to `False`. After this, we can create a provider:

```python
from flask_oauthlib.provider import OAuth1Provider
oauth = OAuth1Provider(app)

@oauth.clientgetter
def load_client(client_key):
    return Client.query.filter_by(client_key=client_key).first()
```

Check code at [commit#78f6cf5](https://github.com/lepture/example-oauth1-server/tree/78f6cf5ebbad01694ff3d5e78ad827acfefbea86).

There will be lots of code, and they would flush this article. In this case,
I would keep them in a repo, and create a revision every time a milestone
finished. You need to follow the links to view the changes.

The next step is [creating request token and verifier](https://github.com/lepture/example-oauth1-server/commit/860850e57d7f5f07441d3019ce7cf0eaaffd0561), we did this by following the documentation of [Request Token and Verifier](https://flask-oauthlib.readthedocs.org/en/latest/oauth1.html#request-token-and-verifier).

Like request token and verifier, we mix timestamp and nonce together.
Find out how we [create timestamp and nonce](https://github.com/lepture/example-oauth1-server/commit/679d9a614cf10b5769f63ac76c45fd9aecb27181). This
is done with the help of documentation on [Timestamp and Nonce](https://flask-oauthlib.readthedocs.org/en/latest/oauth1.html#timestamp-and-nonce).

We will finish all the data models when [access token is created](https://github.com/lepture/example-oauth1-server/commit/88dee8057eb1864d90e1df1895a47efdbad4ee66).

The next big thing is the handlers - how we handle the authorization flow,
the request token and access token. Check [commit#55664c4](https://github.com/lepture/example-oauth1-server/commit/55664c43951f593efa545e8968b1371b9d01659c).

In this commit, we implemented all required handlers. And we also fixed
some bugs, added a logger for debugging. There was a change in `/client`
handler, we added a redirect uri data to the model, and we would use it
later.

Now that we have finished the authorization part of OAuth 1 server, we need
a client to verify it. We created a client with Flask-OAuthlib itself at
[commit#f8b1d09](https://github.com/lepture/example-oauth1-server/commit/f8b1d09b17f3bbcc9ecc41b44e061185e0e87e51).

Let's have a game. Start your provider server with:

    $ python app.py

We visit `http://127.0.0.1:5000/` and fill a username. And then we visit
`http://127.0.0.1:5000/client`, take the client key and client secret, and
modify our `client.py` script with the key and secret. Now, we can start
the client server with:

    $ python client.py

We visit `http://localhost:8000/`, everything should work correctly. We
will be redirected to a confirm page, if we choose yes, client will obtain
a pair of access token and secret. If anything wrong happens, don't
hesitate to tell me. You can also debug it yourself. We enabled the
logging for Flask-OAuthlib so that you can debug easily.

The last part of this tutorial on OAuth 1 is protecting user resources. It
is easy with a decorator `require_oauth`:

```python
@app.route('/api/me')
@oauth.require_oauth()
def me(req):
    user = req.user
    return jsonify(username=user.username)
```

**CHANGED SINCE VERSION 0.5.0. YOU WILL WRITE THIS SNIPPET LIKE THIS:**

```python
@app.route('/api/me')
@oauth.require_oauth()
def me():
    user = request.oauth.user
    return jsonify(username=user.username)
```

This `req` parameter is an oauth request object, it contains many useful
data. You can learn more about it at [Protect Resource](https://flask-oauthlib.readthedocs.org/en/latest/oauth1.html#protect-resource).

Now, find the final `client.py` at [commit#ac3b88d](https://github.com/lepture/example-oauth1-server/commit/ac3b88d0eac572bb216c3aeea6a359872866cfdb)
This commit added a tokengetter, and fixed some bugs I created. After the
client obtained an access token, visit `http://localhost:8000/`, and you
will see the information of current user.

There are more works we should do, but we will finish it right now.
Since this is a simple tutorial, it will not cover any advanced skills.
However, I would give some suggestions at the end of this article.

## Creating OAuth 2 Server

I created OAuth 2 provider in Flask-OAuthlib before OAuth 1 provider. That
means I designed the API for OAuth 2 provider first, and OAuth 1 provider
shares the same API with OAuth 2 provider.

The setup of OAuth 2 server is the same as above. First, we created a
basic simple server with a user system. You can find the code at
[commit#d1e3b6d](https://github.com/lepture/example-oauth2-server/commit/d1e3b6de1982894b97a719b04d9f0161e5739074).

Then we created a Client model and a client handler. Here are the differences,
Client for OAuth 2 use `client_id` instead of `client_key`, `default_scopes`
instead of `default_realms`, and it has a client type (which is public in
this case). See the code at [commit#3f1c8f2](https://github.com/lepture/example-oauth2-server/commit/3f1c8f2f86b408be6105593c3206cad814dfcb73).
We created the Client following the documentation on [Client (Application)](https://flask-oauthlib.readthedocs.org/en/latest/oauth2.html#client-application).

### Implement OAuth 2 Provider

The next step is the implementation for OAuth 2 Provider since we have
finished all preparation works. It is the same as OAuth 1 provider, except
we don't have to make any configuration. via [commit#3b60b5d](https://github.com/lepture/example-oauth2-server/commit/3b60b5d769b807b1549157f76cd46151dd3b8f1d).

```python
from flask_oauthlib.provider import OAuth2Provider
oauth = OAuth2Provider(app)

@oauth.clientgetter
def load_client(client_id):
    return Client.query.filter_by(client_id=client_id).first()
```

Then we would [create Grant Token](https://github.com/lepture/example-oauth2-server/commit/a10c376b6f48bfde52d5fa2d6a8c5cd50e3096e1) and
[Access Token](https://github.com/lepture/example-oauth2-server/commit/ba1fd40293e673ae35180a1c10f95820c6a93d23) , and their getters and setters. It is
much simpler than OAuth 1, since we don't have to create timestamp and nonce.

OAuth 2 has no Request Token. The handlers are simple too. What you need is
a token handler that handles response with access token or refresh token,
and an authorize handler for user to confirm the request.

```python
@app.route('/oauth/token')
@oauth.token_handler
def access_token():
    return None
```

Flask-OAuthlib has done all the tricks, you don't need to handle the data
yourself. However, you can return things that matter to you. They are
advanced skills, and I will not cover it here.

Changes can be found at [commit#cbc3e12](https://github.com/lepture/example-oauth2-server/commit/cbc3e12a3123f4bbc9d68eb8438247357f213583).

Now it is time for testing. We would [create a client.py](https://github.com/lepture/example-oauth2-server/commit/060da19663e006fab409b9e87639f8e00d3c8e22) to do the job. Here is a little trick:

```python
import os
os.environ['DEBUG'] = 'true'
```

**UPDATED**: you should use `OAUTHLIB_INSECURE_TRANSPORT` now:

```python
import os
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = 'true'
```

Remember what I have said? OAuth 2 requires SSL all the time, since we are
developing on a local machine, we don't have HTTPS, As a result, it is
hard to meet this requirement. Fortunately, OAuthlib has a mechanism for
us to debug on HTTP, that is the environ variable `DEBUG`.
(Which is contributed by me).

When we code, we make mistakes. You have to keep an eye on the error
stack, find out what is wrong, and fix it. Yes, I did fix some bugs in
this commit.

And now start the server and client and visit `http://localhost:8000/`.
You will finally get an access token.

We do OAuth, because we want to protect some resources. This is the last
part of this tutorial on OAuth 2 server. We protect them with a decorator
`@oauth.require_oauth`, and this decorator will add an additional paramter
to the handler.

```python
@app.route('/api/me')
@oauth.require_oauth()
def me():
    return jsonify(username=request.oauth.user.username)
```

The demo is finished at [commit#b30339e](https://github.com/lepture/example-oauth2-server/commit/b30339ee5df40ef75e3313587aff11d0ec67339e). Check out
the source code and enjoy it yourself.

## References & Other Resources

I must confess that it is not easy to setup an OAuth server. You need to
learn lots of concepts for understanding. This tutorial don't teach you
the realms and scopes stuff - you can learn these parts from the [Flask-OAuthlib documentation](https://flask-oauthlib.readthedocs.org/).

We did waste lots of time on creating the models and handlers. In fact we
don't have to do such boring things. A demo is just, a demo. I don't mean
to set limitations, and force you to use SQLAlchemy. There are chances
that you want to use redis instead.

That's why I put the SQLAlchemy stuff in the `contrib` module. It is not
finished yet, and I need your contribution.
Find out what's going on in [contrib](https://github.com/lepture/flask-oauthlib/tree/master/flask_oauthlib/contrib).

And one more thing, it would be better if we put those temporary tokens
in cache, for example request token, verifier, timestamp, nonce and
grant token.

Remember that every link is important, if you miss one, you may miss the
target. Chances are that you've already lost your patience.

**TL;DR**


[flask_provider]: https://github.com/ib-lundgren/flask-oauthprovider
[oauthlib]: https://github.com/idan/oauthlib
[oauth.net#55]: https://github.com/aaronpk/oauth.net/pull/55
[flask_oauthlib]: https://github.com/lepture/flask-oauthlib
[ib]: https://github.com/ib-lundgren
[authors_list]: https://flask-oauthlib.readthedocs.org/en/latest/authors.html
[oauth1_client]: https://flask-oauthlib.readthedocs.org/en/latest/oauth1.html#client-application
