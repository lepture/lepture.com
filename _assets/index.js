if (/windows/i.test(navigator.userAgent)) {
  document.getElementsByTagName('html')[0].className = 'windows';
}
if (/MicroMessenger/i.test(navigator.userAgent) && document.querySelector) {
  var twitterCard = document.querySelector('meta[name="twitter:title"]');
  if (twitterCard) {
    document.title = twitterCard.getAttribute('content');
  }
}

function use(u, p, a) {
  if (!p && location.port) return {onload: null};

  if (/\.js$/.test(u)) {a='script'} else {a='link'}

  var d=document, s=d.createElement(a), f=d.getElementsByTagName(a)[0];
  if (a==='link') {
    s.href=u;
    s.rel='stylesheet';
  } else {
    s.src=u;
    s.async=true;
  }
  f.parentNode.insertBefore(s,f);
  return s;
}

exports.use = use;
