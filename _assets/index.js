if (/windows/i.test(navigator.userAgent)) {
  document.getElementsByTagName('html')[0].className = 'windows';
}

var turbolinks = require('turbolinks');
var social = require('social');
var query = require('query');
require('google-analytics');

turbolinks.on('page:visit', function() {
  document.body.className = 'page-loading';
});
turbolinks.on('page:change', function() {
  document.body.className = '';

  // lazy load image
  lazyimg(query.all('.entry-content img'));

  // enable social widget
  var el = query('.social-button');
  if (el) social(el);
  // enable github cards
  gitcards();
  disqus();

  if (location.port) return;
  weixin();
  ga('send', 'pageview', {
    page: location.pathname,
    location: location.href,
    title: pureTitle() || document.title
  });
});


function pureTitle() {
  var el = document.querySelector('meta[property="og:title"]');
  if (el) {
    return el.content;
  }
}

function weixin() {
  // change title for weixin
  if (/MicroMessenger/i.test(navigator.userAgent) && document.querySelector) {
    var title = pureTitle();
    if (title) {
      document.title = title;
    }
  }
}

function use(link, name) {
  var tag;
  if (/\.js$/.test(link)) {
    tag = 'script';
  } else {
    tag = 'link';
  }

  var d=document, s=d.createElement(tag), f=d.getElementsByTagName(tag)[0];
  if (tag==='link') {
    s.href=link;
    s.rel='stylesheet';
  } else {
    s.src=link;
    s.async=true;
  }
  f.parentNode.insertBefore(s,f);
  return s;
}

window.githubCard = {};

function gitcards() {
  var els = query.all('.github-card');
  if (!els.length) return;

  var render = function() {
    els = query.all('.github-card');
    for (var i = 0; i < els.length; i++) {
      githubCard.render(els[i]);
    }
  };

  if (!githubCard.render) {
    var s = use('//lab.lepture.com/github-cards/widget.js');
    s.onload = render;
  } else {
    render();
  }
}

function disqus() {
  var el = query('#disqus_thread');
  if (!el) return;
  el.innerHTML = '';

  var reset = function() {
    DISQUS.reset({
      reload: true,
      config: function() {
        this.page.url = disqus_url;
      }
    });
  };

  if (!window.DISQUS) {
    use('https://' + disqus_shortname + '.disqus.com/embed.js');
  } else {
    reset();
  }
}

function lazyimg(images) {
  if (images.length) {
    for (var i = 0; i < images.length; i++) {
      var src = images[i].getAttribute('data-src');
      if (src) images[i].src = src;
    }
  }
}
