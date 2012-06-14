Vim Color Scheme
=================

:summary:
    How to write your own vim colorscheme ? It's a bit fuzzy, if you don't know the color name.
:date: 2011-12-09
:public: false
:folder: work
:tags:
    - vim
:github: lepture/dotfiles



昨天嘗試著自己寫vim配色，做一點小結。

Basic Gram
-------------

``:hi SyntaxGroup matched-color``

舉個例子:

::

    :hi Number cterm=none ctermfg=white ctermbg=black gui=none guifg=#FFFFFF guibg=#000000

其中 cterm, ctermfg, ctermbg 是針對 terminal 的配色方案。相對的另一部分是針對gui(如GVim, MacVim)
的配色方案。

- cterm 可接受參數 none, bold, italic, underline
- ctermfg 表示前景色, 可接受參數 fg 與 bg, 配色方案受限於你的terminal對顏色的支持度
- ctermbg 表示背景色 (其它同上)

- gui 同 cterm
- guifg 同 ctermfg, 由於是gui，對顏色的支持比較好，可支持 #000000 寫法
- guibg 同上所述


Terminal Basic Color
---------------------

- Black
- White
- Brown
- Blue, LightBlue, DarkBlue
- Green, LightGreen, DarkGreen
- Yellow, LightYellow, DarkYellow
- Red, LightRed, DarkRed
- Magenta, LightMagenta, DarkMagenta
- Cyan, LightCyan, DarkCyan
- Gray, Grey, LightGray, LightGrey, DarkGray, DarkGrey

如果你的 terminal 支持 xterm-256color 的話，可使用更豐富的顏色，參考 `256 xterm 24bit color chart <http://www.calmar.ws/vim/256-xterm-24bit-rgb-color-chart.html>`_ ，以防不測，我做了一個備份在 `256 xterm 24bit color chart backup at evernote <https://www.evernote.com/shard/s19/sh/f6516bdd-0358-4766-80a7-9ea4d34748c7/48009e55b97ae30d3fc14b3848368bc2>`_ 。

這樣你可以使用如 ``ctermfg=273`` 來表示顏色。

Syntax Group
----------------

==============  ====================================================
Group Name      Explain
==============  ====================================================
Comment	        any comment
Constant        any constant
String          a string constant: "this is a string"
Character       a character constant: 'c', '\n'
Number          a number constant: 234, 0xff
Boolean         a boolean constant: TRUE, false
Float           a floating point constant: 2.3e10
Identifier      any variable name
Function        function name (also: methods for classes)
Statement       any statement
Conditional     if, then, else, endif, switch, etc.
Repeat          for, do, while, etc.
Label           case, default, etc.
Operator        "sizeof", "+", "*", etc.
Keyword         any other keyword
Exception       try, catch, throw
PreProc         generic Preprocessor
Include         preprocessor #include
Define          preprocessor #define
Macro           same as Define
PreCondit       preprocessor #if, #else, #endif, etc.
Type            int, long, char, etc.
StorageClass    static, register, volatile, etc.
Structure	    struct, union, enum, etc.
Typedef         A typedef
Special	        any special symbol
SpecialChar	    special character in a constant
Tag             you can use CTRL-] on this
Delimiter       character that needs attention
SpecialComment  special things inside a comment
Debug           debugging statements
Underlined      text that stands out, HTML links
Ignore          left blank, hidden
Error           any erroneous construct
Todo            anything that needs extra attention
==============  ====================================================

更多幫助請參閱 ``:help colorscheme``

昨天配色的一點小成果，雖然還不滿意，還是展示一下吧，你可以在 `github <http://github.com/lepture/dotfiles/blob/master/vim/colors/slate3.vim>`_ 上跟蹤代碼。

.. image:: http://i.imgur.com/opJdr.png
    :alt: vim colorscheme demo
