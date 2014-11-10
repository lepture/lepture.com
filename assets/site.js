
/**
 * Require the given path.
 */
function require(path, parent) {
  if (parent && path.charAt(0) === '.') {
    path = require.normalize(parent, path);
  }
  var resolved = require.resolve(path);

  if (!resolved) {
    parent = parent || 'root';
    throw new Error('Failed to require "' + path + '" from "' + parent + '"');
  }

  var mod = require.modules[resolved];

  if (!mod.exports) {
    mod.exports = {};
    mod.call(mod.exports, mod.exports, require.relative(resolved), mod);
  }

  return mod.exports;
}

/**
 * Storage for registered modules.
 */
require.modules = {};

/**
 * Main definitions.
 */
require.mains = {};
require.main = function(name, path) {
  require.mains[name] = path;
};

/**
 * Resolve `path`.
 */
require.resolve = function(path) {
  if (path.charAt(0) === '/') {
    path = path.slice(1);
  }

  var paths = [
    path,
    path + '.js',
    path + '/index.js'
  ];
  if (require.mains[path]) {
    paths = [require.mains[path]];
  }

  for (var i=0; i < paths.length; i++) {
    var p = paths[i];
    if (require.modules.hasOwnProperty(p)) {
      return p;
    }
  }
};

require.normalize = function(curr, path) {
  var segs = [];

  if (path.charAt(0) !== '.') {
    return path;
  }

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; i++) {
    if (path[i] === '..') {
      curr.pop();
    } else if (path[i] !== '.' && path[i] !== '') {
      segs.push(path[i]);
    }
  }
  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with `definition`.
 */
require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Return a require function relative to the `parent` path.
 */
require.relative = function(parent) {
  parent = parent.split('/');
  parent.pop();

  return function(path) {
    return require(path, parent.join('/'));
  };
};
require.register("query", function(exports, require, module){
function one(selector, el) {
  return el.querySelector(selector);
}

exports = module.exports = function(selector, el){
  el = el || document;
  return one(selector, el);
};

exports.all = function(selector, el){
  el = el || document;
  return el.querySelectorAll(selector);
};

exports.engine = function(obj){
  if (!obj.one) throw new Error('.one callback required');
  if (!obj.all) throw new Error('.all callback required');
  one = obj.one;
  exports.all = obj.all;
  return exports;
};

});
require.register("google-analytics", function(exports, require, module){
var query = require('query');

var el = query('meta[name="google-analytics"]');
var id;
if (el) {
  id = el.getAttribute('content');
}

(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments);
  };
  i[r].l = new Date();
  a = s.createElement(o);
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  if (id) {
    m.parentNode.insertBefore(a, m);
  }
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', id);

module.exports = ga;

});
require.register("emitter", function(exports, require, module){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

});
require.register("matches-selector", function(exports, require, module){
/**
 * Module dependencies.
 */

var query = require('query');

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matches
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = query.all(selector, el.parentNode);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}

});
require.register("closest", function(exports, require, module){
var matches = require('matches-selector')

module.exports = function (element, selector, checkYoSelf, root) {
  element = checkYoSelf ? {parentNode: element} : element

  root = root || document

  // Make sure `element !== document` and `element != null`
  // otherwise we get an illegal invocation
  while ((element = element.parentNode) && element !== document) {
    if (matches(element, selector))
      return element
    // After `matches` on the edge case that
    // the selector matches the root
    // (when the root is not the document)
    if (element === root)
      return  
  }
}
});
require.register("event", function(exports, require, module){
var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};
});
require.register("delegate", function(exports, require, module){
/**
 * Module dependencies.
 */

var closest = require('closest')
  , event = require('event');

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, selector, type, fn, capture){
  return event.bind(el, type, function(e){
    var target = e.target || e.srcElement;
    e.delegateTarget = closest(target, selector, true, el);
    if (e.delegateTarget) fn.call(el, e);
  }, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  event.unbind(el, type, fn, capture);
};

});
require.register("url", function(exports, require, module){

/**
 * Parse the given `url`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.parse = function(url){
  var a = document.createElement('a');
  a.href = url;
  return {
    href: a.href,
    host: a.host || location.host,
    port: ('0' === a.port || '' === a.port) ? port(a.protocol) : a.port,
    hash: a.hash,
    hostname: a.hostname || location.hostname,
    pathname: a.pathname.charAt(0) != '/' ? '/' + a.pathname : a.pathname,
    protocol: !a.protocol || ':' == a.protocol ? location.protocol : a.protocol,
    search: a.search,
    query: a.search.slice(1)
  };
};

/**
 * Check if `url` is absolute.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

exports.isAbsolute = function(url){
  return 0 == url.indexOf('//') || !!~url.indexOf('://');
};

/**
 * Check if `url` is relative.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

exports.isRelative = function(url){
  return !exports.isAbsolute(url);
};

/**
 * Check if `url` is cross domain.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

exports.isCrossDomain = function(url){
  url = exports.parse(url);
  return url.hostname !== location.hostname
    || url.port !== location.port
    || url.protocol !== location.protocol;
};

/**
 * Return default port for `protocol`.
 *
 * @param  {String} protocol
 * @return {String}
 * @api private
 */
function port (protocol){
  switch (protocol) {
    case 'http:':
      return 80;
    case 'https:':
      return 443;
    default:
      return location.port;
  }
}

});
require.register("dom-parser", function(exports, require, module){
/**
 * dom-parser
 *
 * Browser compatible DOM parser.
 */

// Thanks to rails/turbolinks

function useParser(html) {
  var d = new DOMParser();
  return d.parseFromString(html, 'text/html');
}

function useDom(html) {
  var d = document.implementation.createHTMLDocument('');
  d.documentElement.innerHTML = html;
  return d;
}

function useWrite(html) {
  var d = document.implementation.createHTMLDocument('');
  d.open('replace');
  d.write(html);
  d.close();
  return d;
}

var snippet = '<html><body><p>test';

function getParser() {
  var ref ;
  try {
    if (window.DOMParser) {
      ref = useParser(snippet);
      return useParser;
    }
  } catch (err) {
    ref = useDom(snippet);
    return useDom;
  } finally {
    if (!(ref && ref.body && ref.body.childNodes.length === 1)) {
      return useWrite;
    }
  }
}

var parser = getParser();

function dom(html) {
  if (parser) return parser(html);
  return null;
}
dom.parser = parser;

module.exports = dom;

});
require.register("execute-script", function(exports, require, module){
/**
 * Execute a script node.
 *
 * Copyright (c) 2014 by Hsiaoming Yang.
 */

module.exports = function(node) {
  var type = node.type;
  // not javascript
  if (type !== '' && type !== 'text/javascript') return;

  var script = document.createElement('script');
  var attrs = node.attributes || [];

  for (var i = 0; i < attrs.length; i++) {
    (function(attr) {
      script.setAttribute(attr.name, attr.value);
    })(attrs[i]);
  }

  // <script>var foo = 'foo';</script>
  script.appendChild(document.createTextNode(node.innerHTML));

  var parentNode = node.parentNode;
  var nextSibling = node.nextSibling;
  parentNode.removeChild(node);
  parentNode.insertBefore(script, nextSibling);
};

});
require.register("turbolinks", function(exports, require, module){
/**
 * Turbolinks in component.
 */

var delegate = require('delegate');
var domparse = require('dom-parser');
var execute = require('execute-script');
var Emitter = require('emitter');

exports = module.exports = new Emitter();


var hasHistoryState = history && history.pushState && history.replaceState && (history.state !== undefined || navigator.userAgent.match(/Firefox\/2[6|7]/));
var buggyBrowsers = navigator.userAgent.match(/CriOS\//);

// TODO: cookie
var isSupported = hasHistoryState && !buggyBrowsers;

var currentState, referrer, cacheStorage = {}, cacheSize = 10;

function visit(url) {
  if (!isSupported) return location.href = url;
  exports.emit('page:visit', {url: url});

  // remember referer
  referrer = location.href;

  // set cacheSize = 0 to disable cache
  if (cacheSize) {
    cacheCurrentPage();
  }

  // reflect new url
  if (url !== referrer) {
    history.pushState({turbolinks: true, url: url}, '', url);
  }

  var cachedPage = cacheStorage[url];
  if (cachedPage) {
    return fetchHistory(cachedPage);
  }

  return fetch(url, function() {
    if (location.hash) {
      return location.href = location.href;
    } else {
      window.scrollTo(0, 0);
    }
  });
}


/**
 * Fetch and render the data.
 */
function fetch(url, cb) {
  exports.emit('page:fetch', {url: url});

  if (fetch.xhr) {
    fetch.xhr.abort();
  }

  // remove hash for IE10 compatibility
  var safeURL = removeHash(url);

  fetch.xhr = request(safeURL, function(xhr) {
    exports.emit('page:receive');
    var doc;
    var ct = xhr.getResponseHeader('Content-Type');
    if (validContentType(ct) && validStatus(xhr.status)) {
      doc = domparse(xhr.responseText);
    }
    if (!doc) {
      return location.href = url;
    }

    render(doc, true);

    // reflect redirected url
    var loc = xhr.getResponseHeader('X-XHR-Redirected-To');
    if (loc) {
      var preservedHash = removeHash(loc) === loc ? document.hash : '';
      history.replaceState(currentState, '', loc + preservedHash);
    }

    cb && cb();
    exports.emit('page:load');
  });

  fetch.xhr.onloadend = function() {
    fetch.xhr = null;
  };
}

/**
 * Fetch from history.
 */
function fetchHistory(page) {
  if (request.xhr) {
    request.xhr.abort();
  }
  render(page);
  // restore position
  window.scrollTo(page.positionX, page.positionY);
  exports.emit('page:restore');
}

/**
 * Render data to document.
 */
function render(doc, runscript) {
  // update title
  if (doc.title && doc.title.valueOf()) {
    document.title = doc.title;
  }

  var body = doc.body;
  // remove <noscript>
  body.innerHTML = body.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');

  // update body
  document.documentElement.replaceChild(body, document.body);

  // update head
  updateHead(doc.head);

  if (runscript) {
    executeScripts(document.body);
  }

  currentState = history.state;
  exports.emit('page:change');
  exports.emit('page:update');
}


/**
 * Send a GET request.
 */
function request(url, cb) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
  xhr.setRequestHeader('X-XHR-Referer', referrer);

  xhr.onload = function() {
    cb && cb(xhr);
  };

  xhr.onerror = function() {
    location.href = url;
  };

  // emit progress data
  if (xhr.upload) {
    xhr.upload.onprogress = function(e){
      e.percent = e.loaded / e.total * 100;
      exports.emit('progress', e);
    };
  }

  xhr.send();
  return xhr;
}

/**
 * Cache current page
 */
function cacheCurrentPage() {
  cacheStorage[currentState.url] = {
    url: document.location.href,
    head: document.head,
    body: document.body,
    title: document.title,
    positionY: window.pageYOffset,
    positionX: window.pageXOffset,
    cachedAt: new Date().getTime()
  };

  // limitation on cache size
  var cacheKeys = Object.keys(cacheStorage);
  var limitAt = cacheKeys.map(function(url) {
    return cacheStorage[url].cachedAt;
  }).sort(function(a, b) {
    return b - a;
  })[cacheSize];

  cacheKeys.forEach(function(url) {
    if (cacheStorage[url].cachedAt < limitAt) {
      exports.emit('page:expire', cacheStorage[url]);
      delete cacheStorage[url];
    }
  });
}

/**
 * Remove hash on a URL.
 */
function removeHash(url) {
  var link = url;
  if (!url.href) {
    link = document.createElement('A');
    link.href = url;
  }
  return link.href.replace(link.hash, '');
}


/**
 * Validate content type of a response.
 */
function validContentType(ct) {
  return ct.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
}

/**
 * Validate response status code.
 */
function validStatus(code) {
  return code < 400;
}

function executeScripts(doc) {
  var scripts = doc.querySelectorAll('script:not([data-turbolinks-eval="false"])');
  for (var i = 0; i < scripts.length; i++) {
    execute(scripts[i]);
  }
}

function updateHead(head) {
  var nodes = head.querySelectorAll('meta');
  for (var i = 0; i < nodes.length; i++) {
    (function(meta) {
      var property = meta.getAttribute('property');
      if (!meta.name && !property) return;
      var selector;
      if (meta.name) {
        selector = 'meta[name="' + meta.name + '"]';
      } else {
        selector = 'meta[property="' + property + '"]';
      }
      var original = document.head.querySelector(selector);
      if (original) {
        original.content = meta.content;
      } else {
        document.head.appendChild(meta);
      }
    })(nodes[i]);
  }
}

// initialize for event
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', function() {
    exports.emit('page:change');
    exports.emit('page:update');
  }, true);
}

// initialize for click
if (isSupported) {
  // remember current url
  history.replaceState({turbolinks: true, url: location.href}, '', location.href);
  // remember current state
  currentState = history.state;
  delegate.bind(document, 'a', 'click', handleClick, true);

  // state change
  setTimeout(function() {
    window.addEventListener('popstate', function(e) {
      if (e.state && e.state.turbolinks) {
        var cachedPage = cacheStorage[e.state.url];
        if (cachedPage) {
          cacheCurrentPage();
          fetchHistory(cachedPage);
        } else {
          visit(e.target.location.href);
        }
      }
    }, false);
  }, 500);
}

function handleClick(e) {
  if (!e.defaultPrevented) {
    var node = e.delegateTarget;

    // ignore cross origin link
    var crossOriginLink = location.protocol !== node.protocol || location.host !== node.host;

    // ignore anchors
    var anchoredLink = (node.hash && removeHash(node)) === removeHash(location) || node.href === location.href + '#';

    var url = removeHash(node);
    var nonHtmlLink = url.match(/\.[a-z]+(\?.*)?$/g) && !url.match(/\.(?:htm|html)?(\?.*)?$/g);

    var targetLink = node.target.length !== 0;

    var nonStandardClick = e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

    var ignoreClick = crossOriginLink || anchoredLink || nonHtmlLink || targetLink || nonStandardClick;

    if (!ignoreClick) {
      visit(node.href);
      return e.preventDefault();
    }
  }
}

exports.cacheSize = cacheSize;
exports.isSupported = isSupported;
exports.visit = visit;

});
require.register("social", function(exports, require, module){
/**
 * Social Button
 *
 * Copyright (c) 2014 by Hsiaoming Yang.
 */

var SERVICES = {
  twitter: 'https://twitter.com/intent/tweet?text={text}&url={url}',
  facebook: 'http://www.facebook.com/sharer.php?t={text}&u={url}',
  weibo: 'http://service.weibo.com/share/share.php?title={text}&url={url}'
};
var WEIBO_KEY = 8003029170;

function social(el, options) {
  options = options || {};
  if (el.getAttribute('data-widget-rendered')) return;
  el.setAttribute('data-widget-rendered', 'true');
  var prefix = options.prefix || el.getAttribute('data-prefix') || 'icon-';
  var text = options.text || el.getAttribute('data-text');
  var url = options.url || el.getAttribute('data-url') || location.href;
  var image = options.image || el.getAttribute('data-image');
  var showCount = options.count || el.getAttribute('data-count');
  WEIBO_KEY = options.weiboKey || el.getAttribute('data-weibo-key') || WEIBO_KEY;

  var author = {
    twitter: options.twitter || el.getAttribute('data-twitter'),
    facebook: options.facebook || el.getAttribute('data-facebook'),
    weibo: options.weibo || el.getAttribute('data-weibo')
  };

  var counter = {
    twitter: twitterCount,
    facebook: facebookCount,
    weibo: weiboCount
  };

  function createElement(name) {
    if (!author[name]) return;

    var div = document.createElement('div');
    div.className = 'social-button-item social-button-' + name;

    // social icon
    var icon = document.createElement('a');
    icon.className = 'social-button-icon social-button-icon-' + name + ' ' + prefix + name;
    icon.setAttribute('aria-label', 'Share to ' + name);
    icon.setAttribute('title', 'Share to ' + name);
    icon.target = '_blank';

    var link = SERVICES[name];
    var data = text;

    if (name === 'twitter') {
      link += '&via=' + encodeURIComponent(author[name]);
    } else {
      data = text + ' via @' + author[name];
    }

    link = link.replace('{text}', encodeURIComponent(data));
    link = link.replace('{url}', encodeURIComponent(url));

    if (name === 'weibo' && image) {
      link += '&pic=' + encodeURIComponent(image);
    }
    icon.href = link;

    icon.onclick = function(e) {
      e.preventDefault && e.preventDefault();
      window.open(link, '_blank', 'width=615,height=505');
    };

    div.appendChild(icon);

    var fn = counter[name];
    if (fn && showCount) {
      var span = document.createElement('span');
      div.appendChild(span);
      span.className = 'hide';

      // count same urls
      var sameAs = el.getAttribute('data-sameas');
      sameAs = sameAs ? sameAs.split(/\s+/) : [];
      sameAs.push(url);

      try {
        mapCount(sameAs, fn, function(c) {
          span.innerHTML = format(c);
          span.className = 'social-button-count';
          setTimeout(function() {
            span.style.marginLeft = '-' + Math.floor(span.clientWidth / 2) + 'px';
          }, 300);
        });
      } catch (e) {
        // query count failed
        div.removeChild(span);
      }
    }
    el.appendChild(div);
    return div;
  }

  createElement('twitter');
  createElement('facebook');
  createElement('weibo');
}

module.exports = social;

/**
 * Format count.
 */
function format(count) {
  var ret = count / 1000000;

  if (ret > 1) {
    return Math.round(ret * 100) / 100 + 'M';
  }

  ret = count / 1000;
  if (ret > 1) {
    return Math.round(ret * 100) / 100 + 'K';
  }

  return count;
}

/**
 * A simple async map count
 */
function mapCount(urls, fn, cb) {
  var len = urls.length;
  var completed = 0;
  var running = 0;
  var results = [];

  while (running < len && completed < len) {
    fn(urls[running], function(c) {
      completed += 1;
      results.push(c);
      if (completed === len) {
        var ret = 0;
        for (var i = 0; i < results.length; i++) {
          ret += results[i];
        }
        cb(ret);
      }
    });
    running += 1;
  }
}

/**
 * Query facebook share count.
 */
function facebookCount(url, cb) {
  var base = 'https://graph.facebook.com/fql?q=';
  var query = "SELECT share_count FROM link_stat WHERE url = '" + url + "'";
  jsonp(base + encodeURIComponent(query), function(resp) {
    cb(resp.data[0]['share_count']);
  });
}

/**
 * Query twitter tweets count.
 */
function twitterCount(url, cb) {
  var base = 'https://cdn.api.twitter.com/1/urls/count.json?url=';
  if (location.protocol === 'http:') {
    base = 'http://urls.api.twitter.com/1/urls/count.json?url=';
  }
  jsonp(base + encodeURIComponent(url), function(resp) {
    cb(resp.count);
  });
}

/**
 * Query weibo link count.
 */
function weiboCount(url, cb) {
  var link = 'https://api.weibo.com/2/short_url/shorten.json?source=';
  link += encodeURIComponent(WEIBO_KEY) + '&url_long=';
  link += encodeURIComponent(url);
  jsonp(link, function(resp) {
    var shorturl = resp.data.urls[0].url_short;
    link = 'https://api.weibo.com/2/short_url/share/counts.json?source=';
    link += encodeURIComponent(WEIBO_KEY) + '&url_short=';
    link += encodeURIComponent(shorturl);
    jsonp(link, function(resp) {
      cb(parseInt(resp.data.urls[0].share_counts, 10));
    });
  });
}

/**
 * Send a jsonp request.
 */
var _jsonpCache = {};
var _jsonpCount = 0;
function jsonp(url, callback) {
  if (_jsonpCache[url]) {
    return callback(_jsonpCache[url]);
  }

  var funcname = '_social_' + _jsonpCount;
  var src;
  if (~url.indexOf('?')) {
    src = url + '&';
  } else {
    src = url + '?';
  }

  var script = document.createElement('script');
  script.src = src + 'callback=' + funcname;
  script.async = true;
  script.defer = true;

  window[funcname] = function(response) {
    _jsonpCache[url] = response;
    callback(response);
  };

  script.onload = function() {
    delete window[funcname];
  };

  document.body.appendChild(script);
  _jsonpCount += 1;
}

});

require.register("lepture", function(exports, require, module){
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

});









