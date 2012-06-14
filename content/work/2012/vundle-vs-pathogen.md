# Vundle vs Pathogen

- summary: A compare between vundle and pathogen. Which is better for vim plugins management.
- date: 2012-05-02
- category: work
- github: lepture/dotfiles
- tags: vim

------------

Most people just want an answer. Yes, vundle is better.

## Pathogen

Pathogen created a new way to organize vim plugins, it provides the possibility
to make vim plugins a bundle.

The original vim plugin system is somewhat a centered plugin system, but pathogen makes
it a distributing system. The original way:

```
vim/
    syntax/
        html.vim
    indent/
        html.vim
```


The pathogen way:

```
vim/bundle/
    html/
        syntax/
            html.vim
        indent/
            html.vim
```

Now, you can take ``html`` as a bundle (or app), you need not copy every file to the right
directory, everything is well maintained by the plugin creator.

It's almost the end of the world, the vim plugin system should be distributed. And I'm glad
that so many plugins are compatible with pathogen.

I tried pathogen, and [wrote a post](http://lepture.com/work/manage-vim/) (in Chinese) about
it.


## Vundle

At that time, I knew vundle, and I mentioned it in the post, but I didn't try it.
I wish if only I had tried it.

Vundle is inspired by Pathogen, it can do everything pathogen can do,
it is compatible with pathogen, which means if a plugin declares it supporting
pathogen, it supports vundle.

But vundle does more, it improved the way to get and update vim plugins.
I mentioned in my post, that I was trying git-submodule with pathogen,
it was brilliant, but vundle is more elegent:

```vim
set nocompatible               " be iMproved
filetype off                   " required!

set rtp+=~/.vim/bundle/vundle/
call vundle#rc()

" let Vundle manage Vundle
" required! 
Bundle 'gmarik/vundle'

" My Bundles here:
"
" original repos on github
Bundle 'tpope/vim-fugitive'
Bundle 'Lokaltog/vim-easymotion'
Bundle 'rstacruz/sparkup', {'rtp': 'vim/'}
Bundle 'tpope/vim-rails.git'
" vim-scripts repos
Bundle 'L9'
Bundle 'FuzzyFinder'
" non github repos
Bundle 'git://git.wincent.com/command-t.git'
```

Launch vim and run ``:BundleInstall`` , everything will be ready for you.
All things you should do is trying it.

Save my words, save your time, head over to
[Vundle](https://github.com/gmarik/vundle) immediately.
