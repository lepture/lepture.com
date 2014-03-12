# 當我談開源時我談些什麼

- date: 2014-03-12 18:10
- tags: github, python, git

開源對我來說是一件順便的事，沒有什麼崇高的目的。與理想無關，更多的是一種實用主義。

---

哦，不要在意這個標題。我知道你們看過《當我談跑步時我談些什麼》，也看過《當我們談論愛情時我們在談論什麼》。

那麼當我談開源時我要談些什麼呢？我以爲第一點要弄清楚的是開源是什麼。一般人眼裏的開源是怎麼樣的，我不知道，只能不懷惡意地揣測，大抵是指免費的可以查看到源代碼的軟體吧。

當然，這不過是我個人的猜測。我眼中的開源遠不止如此，開源不僅僅只有軟體和代碼。英文的開源一詞乃 Open Source，至於 Source 是什麼，並沒有明確的限定。它可以是 Open-source software[^open-source]，可以是 Open-source content，可以是 Open-source journalism，可以是 Open-source university，甚至於 [Open-source politics](http://en.wikipedia.org/wiki/Open_politics)。

例如我曾閒暇無聊時整理過[中華人民共和國的法律][chinalaw]，它不是軟體，不是代碼，但是我一樣認爲這是一個開源庫。本質上來說，它甚至不是源[^source]。但是換一個角度來看，它又是第一個整理成 Markdown 格式的法律集，那麼從這個角度來說，也可看作是源了。

因爲職業的關係，我所能談的也只有 Open-source code 了。但是萬不要以爲開源就只有代碼，你可以開源任何事物。

[^open-source]: 開源軟體，這大約就是一般人眼裏的開源，也就是所謂狹義的開源。
[^source]: Source 的本意即是來源、出處、根源。
[chinalaw]: https://github.com/lepture/chinalaw

----

你也許不知道，我是 GitHub 上最活躍的大陸華人[^github-top]。創建了一個又一個的開源庫，挖了許多坑，也填了許多坑。這樣看來彷彿我挺熱衷於開源的，其實不然，我是屬於消極開源的一類人。

例如我曾在 [The Unpleasant Part of Open Source](/en/2013/unpleasant-open-source) 一文裏提到：

> We open source not because people need us. We just happen to open source things that solve our problems, and wish it may help other people.
> Open source can be a business for a company, but not for individuals.

開源對我來說是一件順便的事，沒有什麼崇高的目的。與理想無關，更多的是一種實用主義。我寫了一個 Python 庫，順便放在 GitHub 上做管理，順便發布到 PyPI 裏方便下載安裝。一切都是因爲順便。有時覺得對別人會挺有用的，便會特地去[宣傳宣傳](http://www.reddit.com/r/Python/comments/1yz7bl/markdown_parsers_in_python/)。比如最近寫的一個 [Markdown 解析器](/en/2014/markdown-parsers-in-python) [mistune](https://github.com/lepture/mistune)。但是更多的時候，我並不會刻意去做太多，沒有那麼多精力。

聽起來彷彿挺沒有責任心。其實不然，我寫的東西還是很不錯的。雖然是順便爲之，測試用例、文檔卻是一樣都不會少的，而且代碼也寫得漂亮[^code-style]。既然有打算給別人用，文檔是必不可少的，許多程序員不喜歡寫文檔，我不在其列，我認爲沒有文檔的程序不叫開源程序。如果你有興趣，可以隨便看看我寫的文檔：

* [Flask-OAuthlib](https://github.com/lepture/flask-oauthlib): https://flask-oauthlib.readthedocs.org/
* [otpauth](https://github.com/lepture/otpauth): https://pythonhosted.org/otpauth/

[^github-top]: 最活躍並不代表什麼，說起來也沒有什麼特別拿得出手的東西。最近活躍度變低了，名次一直在掉，但是截止到寫這篇文章依舊是大陸區第一。
[^code-style]: 我喜歡漂亮的代碼。漂亮多半時候指的是代碼風格，也偶爾指漂亮的邏輯。

----

開源代碼分兩類，一類是 Software(Application)，一類是 Library（庫）。Software 是針對使用者的，是一個可直接使用的程序；Library 是針對開發者的，爲開發者編寫代碼提供便利。比如 Gitlab 是一個 Open Source Software，而 Gitlab 使用的 Rails 框架則是一個 Library。對一般人來說，接觸的更多的應該是開源軟體。

初入行時，我寫過一個運行在 GAE 上的博客，這是 Software。後來慢慢就不再寫 Software 了，改寫 Library 了。因爲 Software 很容易讓我廢棄掉，一旦不再使用，就沒有動力去更新了。而 Library 則不然，你輕易不會廢棄掉，即使你不再使用，因爲功能單一明確，很容易讓別人接手。比如 [lepture/flask-wtf](https://github.com/lepture/flask-wtf) 這個庫便是從旁人那裏接手過來的。

自己使用[^dog-food]是一個很重要的原則。如果一個庫自己不再使用，而有其他人來提 Bug 或者 feature，我是懶得搭理的。沒有金錢收入，自己又不用，哪裏有心思修改刪增呢！以前寫了一個 Python 庫，叫 Livereload，是一個 Software。剛開始時用了一段時間，後來便廢棄了。然而不時還有人來提 issue，因爲我暫時用不着，便不太搭理人。而後靈光乍現，[將 Livereload 從 Software 改成 Library](/en/2013/new-life-of-livereload)，便又能吃自己的狗糧了。也下定了決心，以後要少寫軟體，多寫庫。

但是我偶爾還會寫一些開源軟體，專注於單一的功能，代碼量足夠小。這樣即使我不再使用它，只需要花少量的時間就能了解它，修改它。最近的例子就是 [rewatch](https://github.com/lepture/rewatch)，區區 80 幾行代碼，賞心悅目。

[^dog-food]: 所謂 Eat your own dog food 是也。

----

有的同學可能覺得開源是一件很偉大的事，我頗不以爲然。大可不必看得太重，當然也不可輕賤。看得太重，便會生怯，妄自菲薄，以爲這樣崇高的事自己是做不了的。假使有志於做點貢獻，我也有些許建議。

* 首先註冊一個 GitHub 賬戶，學習一下 Git 的使用。現在多數開源庫都託管在  GitHub 上的。
* 從使用別人的庫開始，在 GitHub 上 Star 一下別人的庫，讓開發者知道有人關注他寫的東西。
* 遇到好東西，幫忙作者宣傳一下，也算是在做貢獻
* 在使用過程中，你不可避免的會遇到各種各樣的問題，即時反饋給開發者。
* 有能力的話，不妨修復這些問題，然後給作者發 pull request，說明清楚你解決了什麼問題。
* 你遇到了一個問題，又找不到好的方案，於是你開始自己解決這些問題，同時公開了你的解決方案。

我並不贊同刻意地參與，最有效的參與便是使用。在使用過程中發現問題，反饋問題，解決問題。開始的時候，多關注一些小項目，更少的代碼量有助於你理解它，發現它的問題，複雜的項目會讓人望而生怯，讓你裹足不前。

我並不總是在寫自己的代碼，也會給別人[提問題](https://github.com/hhatto/python-hoedown/issues/5)，也會給別人[發 patch](https://github.com/chjj/marked/pull/129)。但是前提是，我在使用，而且在使用過程中遇到了問題。也許你發現的並不是什麼大問題，比如文檔裏的某個單詞寫錯了，沒有關係，大膽地給作者發 pull request 吧。

最後，在參與的過程中注意一下「[如何向开源社区提问题][question]」。

[question]: https://github.com/seajs/seajs/blob/master/CONTRIBUTING.md