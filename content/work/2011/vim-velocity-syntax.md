# Velocity Syntax for VIM

- date: 2011-12-26 23:30
- category: work
- github: lepture/vim-velocity
- tags: vim, alipay

Velocity Syntax for VIM, a better replacement for the one on vim.org. For people who are using VIM and have to deal with velocity.

-----------------

## Who need this ?

People who:

+ are using VIM
+ have to deal with velocity
+ find the original one on vim.org is not good enough
+ want to have a better syntax

## Preview

A preview with my slate3 theme:

![velocity syntax for vim](http://i.imgur.com/48SoD.png)


## Install


If you are using [pathogen](https://github.com/tpope/vim-pathogen), GREAT!
Or even better with [Vundle](https://github.com/gmarik/vundle).
If not, try to !

### Non-Pathogen, non-vundle User:

```
git clone git://github.com/lepture/vim-velocity.git
cp vim-velocity/syntax/velocity.vim ~/.vim/syntax/
```

### Pathogen User:

```
git submodule add git://github.com/lepture/vim-velocity.git ~/.vim/bundle/velocity
```

### Vundle User:

Add in your vimrc:

```
Bundle 'lepture/vim-velocity'
```

And run command in vim: ``:BundleInstall``.

## Configuration

Add to your vimrc:

```vim
au BufRead,BufNewFile *.vm set ft=html syntax=velocity
```

For vimmer in alipay, add this:

```vim
au BufRead,BufNewFile *.vm set ft=html fileencoding=gbk syntax=velocity
```


## Attention

There is one more keyword ``cmsparse`` which alipay's sofaMVC contains in the syntax file. If you are not comfortable with this, you may remove it by yourself. But I don't think it will bother you.

## How to write syntax

It's not that hard, but you should keep in mind that vim use a magic regex, which really sucks.

It is not a post on this topic, all you need is ``:help syntax`` . Good luck!
