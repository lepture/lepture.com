# 前端的基础修养：aria-label

- date: 2015-08-12 21:40
- tags: fe-basic, wai-aria

aria-label 是一个 HTML attribute，用来告诉读屏软件某个元素是什么，提升 Web Accessibility。

---

「前端的基础修养」是我拟写的一系列文章的总标题。所以唤作「修养」，大抵因为心虚，觉得没有什么技术含量，不便言之技术。这一系列会以乱序呈现，同一主题的文章会穿插出现。

这一篇谈 Accessibility 相关的主题——aria-label 的使用。Accessibility 作为一个整体，是一个庞大而复杂的主题。这里单讲 aria-label，因其比较简单与实用，作为切入点正合适。

可能有人不理解什么是 Accessibility，这里简单解释一下。比如地铁有大通道方便轮椅通过，比如红绿灯有声音提示方便盲人通行，比如鼠标有左手模式方便习惯用左手的人使用。让更广泛（生理上有所不同）的人群可以使用，就是 Accessibility。

这个话题去岁在台湾谈过，是参加 JSDC 2014 时讲的，[不被重視的 HTML：Accessibility](/zh/2014/talk-on-accessibility-jsdc2014)。

## aria-label 初窥

aria-label 是一个 HTML attribute，用来告诉读屏软件某个元素是什么。例如一个关闭按钮「×」，视觉上看来都能理解，但是读屏软件并不能正确读出，这时就可以用 `aria-label` 告诉它：

```html
<button aria-label="关闭">&times;</button>
```

读屏软件（比如说 Voice Over）就会读出「按钮，关闭」。图片 `<img>` 的 `alt` 属性亦有此效果，因为图片本身是没有办法被读出的，所以读屏软件会去阅读 `alt` 的内容。

假如 `<img>` 标签同时有 `aria-label` 与 `alt` 属性，那么读屏软件应该阅读哪个的内容呢？答案当然是 `aria-label`。这里需要明白 `alt` 本身还有另一个作用，当图片无法加载时，浏览器会将 `alt` 的内容展示给用户。

![alt 在各个浏览器里的显示情况](//dn-lepture.qbox.me/blog/image-alt.jpg "alt 在各个浏览器里的显示情况")


## aria-label 与 title

全局属性 `title` 是用作提示与补充的，你认为读屏软件会识别 `title` 么？完全不会，Voice Over[^vo]、JAWS[^jaws]、NVDA[^nvda] 都不会去识别，`title` 对于 Accessibility 毫无帮助。

```html
<a href="#" title="设置"><img src="gear.png"></a>
```

这段代码是一个链接，使用一个图片表示「设置」，使用 `title` 注释。如果鼠标悬浮在链接上的话，会出现提示，但是读屏软件根本无法识别。你应该使用 `aria-label` 来代替 `title`:

```html
<a href="#" aria-label="设置"><img src="gear.png"></a>
```

## aria-label 与 iconfont

多数网站已经不使用图片来表示 icon 了，转而使用 iconfont 又或者 svg。无论是哪种方案，图标都只是给视觉正常的人使用的。这个时候你需要使用 `arial-label` 来标注：

```html
<a href="#"><i class="icon-gear" aria-label="设置"></i></a>
<a href="#" aria-label="设置"><i class="icon-gear"></i></a>
```

上面的例子里给出了两种方案，一是在图标本身的标签上，一是在链接 `<a>` 上，两种方案读屏软件都能正确识别，但是个人以为放在链接 `<a>` 上比较好，比如链接里是图标加文字说明的形式：

```html
<a href="#" aria-label="设置"><i class="icon-gear"></i> 设置</a>
```

这时便不能在 iconfont 上添加 `aria-label` 了，否则会念两遍「设置」，但是这种情况更好的方法是使用 `aria-hidden`：

```html
<a href="#"><i class="icon-gear" aria-hidden="true"></i> 设置</a>
```

## aria-label 作为提示

但是许多时候，即使你能看清楚图标，你也完全不知道那是个什么鬼东西，图标始终是一个抽象概念，并非人人都能理解。我们常会用 tooltip 作为提示，比如 [jquery.tipsy](http://onehackoranother.com/projects/jquery/tipsy/)。

jquery.tipsy 这个插件默认使用 `title` 作为数据来源，也可以使用其它属性：

```js
$('#example-custom-attribute').tipsy({title: 'aria-label'});
```

GitHub 使用的纯 CSS 方案不错，使用 CSS `attr()` 获取 arial-label 的内容作为提示，在不需要兼容老旧浏览器的情况下建议使用，整理代码如下：

```css
.tip {
  position: relative;
}
.tip:before {
  display: none;
  position: absolute;
  top: auto;
  right: 50%;
  bottom: -7px;
  margin-right: -5px;
  width: 0;
  height: 0;
  content: '';
  border: 5px solid transparent;
  border-bottom-color: rgba(0, 0, 0, 0.9);
  pointer-events: none;
  z-index: 10000;
}
.tip:after {
  display: none;
  position: absolute;
  top: 100%;
  right: 50%;
  padding: 0 10px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.9);
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  content: attr(aria-label);
  white-space: pre;
  z-index: 10000;
  margin-top: 5px;
  line-height: 26px;
  transform: translateX(50%);
}
```

![GitHub aria-label 提示](//dn-lepture.qbox.me/blog/github-aria-label.png "GitHub 使用 aria-label 提示")


## aria-label 与表单

`placeholder` 的出现导致了大量不带 `<label>` 的 form 表单，然而**读屏软件是不会识别 `placeholder`** 的。例如：

```html
<input name="username" placeholder="用户名">
<input name="email" placeholder="邮箱">
```

对于视觉正常的人来说没有问题，但是在读屏软件看来它只是两个输入框，至于需要输入什么，它是不知道的。这个时候你需要用 `aria-label` 再次标注：

```html
<input name="username" placeholder="用户名" aria-label="用户名">
<input name="email" placeholder="邮箱" aria-label="邮箱">
```

还有另外一种方案，使用 `<label>`，但是不显示 `<label>`：

```html
<label for="username" class="sr-only">用户名</label>
<input id="username" name="username" placeholder="用户名">
```

使用 CSS 来隐藏 `.sr-only`(screen reader only) 这个 class 的标签，注意不能使用 `display: none`，否则读屏软件会忽略，只在[视觉上将其隐藏](http://a11yproject.com/posts/how-to-hide-content/)即可。


## 索引

`aria-label` 理论上是作用于所有 tag 的，但是我实际测试下来，不支持 h(n) 例如 h1-h6。

* https://dev.opera.com/articles/ux-accessibility-aria-label/
* http://webaim.org/techniques/forms/advanced
* http://www.deque.com/blog/text-links-practices-screen-readers/
* http://www.w3.org/TR/2015/WD-aria-in-html-20150521/

[^vo]: Voice Over 是 Apple (Mac & iOS) 的读屏软件
[^jaws]: JAWS 是一个读屏软件，适用于 Windows
[^nvda]: NVDA 是一个开源读屏软件 http://www.nvaccess.org/