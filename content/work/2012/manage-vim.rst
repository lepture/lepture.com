整理VIM
========

:date: 2012-02-01 10:30
:category: work
:public: false
:github: lepture/dotfiles
:tags:
    - vim
    - git


我 Vim [1]_ 的配置文件有很多年（其實也沒用多少時間）沒有動過了，一直保持著很少的插件，
這其間也未讀過其他人關於Vim的文章。因為Vim的幫助文檔很詳細，不知道的時候就 ``:help`` 一下，
所以就沒有動力去關注。

昨天看 Steve Losh 的這篇 `Coming Home to Vim <http://stevelosh.com/blog/2010/09/coming-home-to-vim/>`_ 就悔恨以前的忽略了。這裡就不做翻譯了。

.. contents:: Table of Contents

Pathogen
---------

`Tim Pope <http://github.com/tpope>`_ 2008年的時候就寫了 Pathogen_ [2]_ 這個插件，用來管理其它的
Vim plugins 。大致的結構為

::

    .vim/
        bundle/
            somebundle1/
                syntax/
                plugin/
                ftplugin/
                indent/
            somebundle2/

使用 Pathogen 的好處很明顯，每一個 bundle 是獨立的，比如 snipMate ，它有 plugin, ftplugin,
syntax 等等，那麼這些文件都會分散到相應的目錄，不是一個整體，不方便管理。而 Pathogen
就很好的解決了這個問題。現在你的目錄結構就是：

::

    .vim/
        bundle/
            snipmate/
                README.markdown
                after/
                autoload/
                doc/
                ftplugin/
                plugin/
                plugin-info.txt
                snippets/
                syntax/


這樣做的好處還有一點就是方便更新，我將在後面解釋。

Pathogen 的基本原理就是改變 Vim 的 runtimepath ，所以你可以想見即使不是 Vim 所支援的目錄名如
snipMate 要用到的 snippets 這個目錄，它一樣可以管理起來。例如

::

    .vim/
        bundle/
            velocity/
                snippets/
                    html.snippets/
                syntax/
                    velocity.vim

如果你還沒有使用 Pathogen 的話，現在就開始使用吧。如果你寫的Plugin不相容Pathogen的結構的話，
就速度改過來吧。


Manage Vim Plugin
------------------

現在都2012年了，不要再做 "unzip and drag the files into the right directories" 這樣的事了。

當你要更新 Plugin 時，也不要再 "download and drag the files into the right directories" 。

Install Plugin
~~~~~~~~~~~~~~~

處在一個 Git [3]_ 的時代，你可以看到很多人將 vim plugin 放到 Github_ 上，比如 `Tim Pope`_ 。
同時還有 `vim-scripts <https://github.com/vim-scripts>`_ 這個項目，它收集整理了很多 Vim Plugin。

這樣的話，就很方便用 git submodule 來管理了。當我要安裝新的 plugin 時，只需要：

::

    git submodule add git://github.com/lepture/vim-velocity.git bundle/velocity

這裡假設你的 .vim 是一個 Git repo。

使用 submodule 的好處是維持一個乾淨的 git repo ，同時也方便更新 plugin 。

Update Plugin
~~~~~~~~~~~~~~

既然我們用了 git submodule 來安裝 plugin ，那麼更新時就很簡單了。比如你要更新如上 velocity_
這個 plugin ：

::

    cd bundle/velocity && git pull origin master

也許你想一下子更新所有 plugin：

::

    git submodule foreach git pull origin master

這樣就更新了所有的 submodule。

How I Manage My Vim
~~~~~~~~~~~~~~~~~~~~

我不只是管理 vim ，我所有的 `dotfiles <https://github.com/lepture/dotfiles>`_ 都是放在一個
git repo 裡的，然後 ``ln -s`` 到相應的位置。

具體可參照 https://github.com/lepture/dotfiles/blob/master/bootstrap.sh

Other Ways to Manage Vim
~~~~~~~~~~~~~~~~~~~~~~~~

其它方案請參考 http://vim-scripts.org/vim/tools.html


Velocity for Vim
----------------

昨天也順便把之前寫的 velocity_ syntax for vim 整理出來，新增了 snippets 支援。

Repo: http://github.com/lepture/vim-velocity


.. [1] VIM: Vi IMproved. Editor for programmers!
.. [2] Pathogen Replacement: `Vundle <https://github.com/gmarik/vundle>`_
.. [3] Git: 一種分布式版本控制工具
.. _Pathogen: http://github.com/tpope/vim-pathogen
.. _Github: https://github.com
.. _velocity: http://lepture.com/work/vim-velocity-syntax/
