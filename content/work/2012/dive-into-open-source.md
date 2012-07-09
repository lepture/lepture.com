# Dive into Open Source

- date: 2012-07-09 18:39
- category: work
- tags: git, linux, python, github

--------------------------

It has been two years since my first registration of [GitHub](https://github.com/lepture).
I have learned a lot in the past two years, but the most import thing is that I had a good beginning.

I heard of version control when I first dived into coding, and luckily, I learned mercurial instead of subversion. It's really a good start.

I enjoyed Linux instead of Windows when I bought my first PC. In the first three months, I switched to Ubuntu and then switched back to Windows, and then switched to OpenSUSE and then switched back to Windows, and finally I enjoyed Ubuntu. It's really a good start.

Open source means a lot in my daily life, even though I am on a Mac instead of Linux now.

- I am coding with vim, it's open source
- I am version controlling with git, it's open source
- I am serving with nginx, it's open source

When I think about open source, I would take a note from GNU:

> "Free software" is a matter of liberty, not price. To understand the concept, you should think of “free” as in “free speech”, not as in “free beer”.

Open source is free in some ways, but free software is not open source. In my concept, open source means:

- interests
- sharing
- quality
- responsibility

## Interests

When you open source, you don't take it as a business, and you won't expect to earn money on your projects. (Okay, it's not true. But think it personally, think about personal projects)

I think it would be great if we can earn money in open source. But when you can't, you are driven by your interests. The most typical one:

> eat your own dog food

When we open source, we are sharing our own tools, and we hope it would be helpful to others.


## Sharing

A good place to share your code is [GitHub](https://github.com).

There are several code hosts, include [Google Code](http://code.google.com/hosting/), and [BitBucket](https://bitbucket.org). I thought BitBucket could be great, but its not popular than GitHub now.

"Hey, you missed sourceforge". Forget it, sourceforge is not a good place for open source. A project on sourceforge means that it is not maintained well.

Sharing your project in a right place is of great significance. Register a GitHub account, nerd!

Being social! GitHub is really a good place for social coding, you can easily fork a project, and send your patch. If you want to complain, open an issue. If you have a good idea, open an issue. If you need a favor, open an issue. It's really easy.

And it's all version controlled!

Follow me on [GitHub](https://github.com/lepture).


## Quality

When you host your project on GitHub, it's not open source yet. You are just hosting your code right now. Open source means quality, it's not a toy.

In this case, lots of repos of mine on GitHub are not open source yet. But it's really normal.

What means Quality?

- a good structure of source code
- pretty code style
- inline documentation properly
- full test cases
- keep a bug tracker
- version controlled

There is a great place for unit tests: [travis](http://www.travis-ci.org/). Run your test on travis could be easy. Have a look at the [documentation](http://about.travis-ci.org/).

It's not that really neccessory to fulfill the whole things when you are doing a small project. But it's neccessory to take it into account when you are in your development.

References for quality coding:

- [Repository Structure and Python](http://www.kennethreitz.com/repository-structure-and-python.html)
- [Code Style for Python](http://docs.python-guide.org/en/latest/writing/style/)
- [package.json for npm](http://npmjs.org/doc/json.html)


## Responsibility

Open source means responsibility. A project without documentation is not open source. It's code snippets.

Document your project right now.

For small projects, it's a little waste of time to keep a documentation site, it's recommended to document in your README file. Why not try [README Driven Development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html).

But if you can't document in one file, you should keep a ``docs`` directory in your project. Learning a markup language, write your documentation in markdown or rst or anything else.

It is recommened for pythoners that you write your documentation in rst(reStructuredText), and build your documentation with [Sphinx](http://sphinx.pocoo.org/). Oh, even lisp programmers are building documentation with Sphinx now.

There is a great site for hosting your documentation: [Read the Docs](http://readthedocs.org/). You don't even have to bought a domain, but if you want to host your documentation with your own domain, Read the Docs supports it.

## Conclusion

It's really embarrassed that I have a few projects that can be really called an open source project.

I would like to introduce a project named "Felix Felicis" in my next posts. Oh, it can be called an open source project now.
