Velocity Syntax for VIM
=======================
:summary: 
    Velocity Syntax for VIM, a better replacement for the one on vim.org. For people who are using VIM and have to deal with velocity.
:date: 2011-12-26 23:30
:folder: work
:github: lepture/dotfiles
:tags:
    - vim
    - alipay


Who need this ?
---------------
People who:

+ are using VIM
+ have to deal with velocity
+ find the original one on vim.org is not good enough
+ want to have a better syntax

Preview
----------
A preview with my slate3 theme:

.. image:: http://i.imgur.com/48SoD.png
    :alt: velocity syntax for vim


Install
---------
+ Download:

  ``wget https://github.com/lepture/dotfiles/raw/master/vim/syntax/velocity.vim``

+ Place it at `~/.vim/syntax`

+ Add to your vimrc:

  ``au BufRead,BufNewFile *.vm set ft=html syntax=velocity``

For vimmer in alipay, add this:

``au BufRead,BufNewFile *.vm set ft=html fileencoding=gbk syntax=velocity``


Attention
----------
There is one more keyword ``cmsparse`` which alipay's sofaMVC contains in the syntax file. If you are not comfortable with this, you may remove it by yourself. But I don't think it will bother you.

How to write syntax
-------------------
It's not that hard, but you should keep in mind that vim use a magic regex, which really sucks.

It is not a post on this topic, all you need is ``:help syntax`` . Good luck!
