# New life of livereload

- date: 2013-12-31 13:30
- tags: python, web
- github: lepture/python-livereload

This is not a changelog of a project. It is what I learned in the development of livereload.

-----

I created [livereload](https://github.com/lepture/python-livereload)
(implemented in Python) one year and 8 months ago. The first version was
released on May 4th, 2012. I had been working on it for a while, but I
didn't enjoy it myself.

[LiveReload](http://livereload.com/) is a Mac software that monitors
changes in the file system. A quote from the official website:

> As soon as you save a file, it is preprocessed as needed, and the browser
> is refreshed.

And my implementation in Python is a command line tool that simulates the
behavior of LiveReload, a bit like [guard](https://github.com/guard/guard).

The reason why I created this project is pretty simple. I was working in a
Python-only development environment, it would be nice that everything is
in Python. However, things changed in the last year, I am more a front end
developer than a back end pythonist. I enjoy nodejs, I also enjoy other
languages like ruby and golang.

Anyway, I don't like to start another server for watching file changes only,
the original design of Guardfile is not good enough, at least I am not
satisfied. The simulation just doesn't work for me.

> most things have some design behind,
> as people copy it, the original design gets obscured and forgotten,
> the original design might no longer apply
>
> -- Armin Ronacher

This is a slide of a talk by Armin Ronacher -- [Thinking Outside The Box](https://speakerdeck.com/mitsuhiko/thinking-outside-the-box).

## Create something I will use in the daily life

The original copied one has nothing new, nothing special for Python that
I wouldn't use it in my daily life. This makes me sad. So I have no much
enthusiasm in the maintainence of it.

But I do believe that livereload is a good idea. Maybe I just did it wrong.
One day, a brilliant idea came to me -- livereload for wsgi.

A simple example of the idea:

```python
from livereload import Server

server = Server(wsgi_app)
server.watch('static/app.css')
server.serve()
```

Wow, that looks good. It seems something that I will use in my daily life.
Since I prefer Flask, I can write the scripts with Flask-Script in a
`manage.py` file:

```python
app = create_app()

@manager.command
def liveserver(port=5000):
    from livereload import Server
    server = Server(app.wsgi_app)
    server.watch('static/*.css')
    server.serve(port=port)
```

And whenenver a css file changes, the browser will refresh it itself.

Actually, my environment of front end development is far more complex,
I use rework for css processing, component for javascript modular. The
real example would be gorgeous.

Take a peep of my scripts:

```python
@manager.command
def liveserver(port=5000):
    from livereload import Server

    server = Server(app.wsgi_app)
    server.watch('assets/styles/*.css', 'make -C assets rework')
    server.watch('assets/lib/*.js', 'make -C assets build')
    server.watch('app/templates')
    server.serve(port)
```

## Do one job, and do it well

Version 2.0 of livereload is more a library rather than an application.
So that other libraries in Python can easily bundle it in. I hope it can
be a great library.

The executable command line tool is removed from livereload. It may come
back again, but not soon. The compilers like uglifyjs, lesscss, slim,
CoffeeScript are removed from livereload too.

For now, livereload will focus on one thing -- livereload. And livereload
well.

The lack of compilers does not affect much. Since livereload provides you
a way to execute shell command. As you can see in the above example that
`server.watch` supports executing shell commands, so that we can do:

```python
server.watch('src/foo.js', 'uglifyjs src/foo.js -m -o build/foo.js')
```

That's why compilers are removed, since every compiler is some sort of a
shell command, there is no reason for wrapping them in Python any more.

By removing compilers, livereload focuses on the server implementation,
and file watcher. The core code is much simple now.

## The future

The rewritted version 2.0 of livereload was released days ago. There are
features not implmented, bugs not fixed, but the concept works well. It
is not just an implementation **of Python**, it is an implementation
**for Python**.

The code is much more pretty than before. It is well documented and tested.
I hope people will enjoy it. It is a library now, I am looking forward to
libraries that depend on this project and making the web development of
more fun.
