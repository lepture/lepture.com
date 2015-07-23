require('google-analytics');

var query = require('query');

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
