require('google-analytics');

var query = require('query');

ga('send', 'pageview', {
  page: location.pathname,
  location: location.href,
  title: pureTitle() || document.title
});

var socialButton = query('.social-button');
if (socialButton) {
  require('social')(socialButton);
}

var images = query.all('.entry-content img');
if (images.length) {
  for (var i = 0; i < images.length; i++) {
    var src = images[i].getAttribute('data-src');
    if (src) images[i].src = src;
  }
}

function pureTitle() {
  var el = document.querySelector('meta[property="og:title"]');
  if (el) {
    return el.content;
  }
}
