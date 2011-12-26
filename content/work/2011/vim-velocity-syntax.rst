Velocity Syntax for VIM
=======================
:summary: 
    Velocity Syntax for VIM, a better replacement for the one on vim.org.
:date: 2011-12-26 10:30
:folder: work
:github: lepture/dotfiles/blob/master/vim/syntax/velocity.vim
:tags:
    - vim
    - alipay


A preview:

.. image:: http://i.imgur.com/48SoD.png
    :alt: velocity syntax for vim

For non Chinese
---------------
If you are using VIM, and if you have to work with velocity, you will find a velocity syntax at http://www.vim.org/scripts/script.php?script_id=541 . But it's not good enough, it really sucks.

So I wrote a syntax myself, hope you enjoy it.

+ Download: `Velocity Syntax <https://github.com/lepture/dotfiles/raw/master/vim/syntax/velocity.vim>`_
+ Place it at ~/.vim/syntax
+ Add to your vimrc: ``au BufRead,BufNewFile *.vm set ft=html syntax=velocity``

For Chinese
-----------
之前一直在写 css3 syntax，还没有完成，请 `@janlay <https://twitter.com/janlay>`_ 看看。@janlay 建议写一个 velocity syntax ，对工作更有用。

其实有在 vim.org 上找到过一个 syntax ，不过写的有问题，就没有用了。看时间，大约作者也不再维护了。

原先的repo是 vim.syntax ，应鹭飞之请，释出了我的 dotfiles（颇为汗颜），于是就删掉了 vim.syntax，统一在 dotfiles 里维护吧。

如果你的系统很糟糕，也用的是GBK的话，vimrc 的配置请用:

``au BufRead,BufNewFile *.vm set ft=html fileencoding=gbk syntax=velocity``
