PAC解析及其它
===================================

:summary: 编写属于自己的Proxy Auto Config，其实不难。如果你是前端的话，那简直是小儿科了。
:date: 2011-09-29
:folder: work
:tags:
    - javascript


PAC_ (Proxy Auto Config) 是 Netscape 于1996年设计出来的，我不知道他们当时是出于何种心境，是出于何种需求。他们又何尝想到，这一协议将会如何惠及到大陆仔呢！

闲话少叙，单表PAC。

PAC使用 javascript 语法（这当然是因为 Netscape），PAC 文件里必有的一个函数是 ``FindProxyForURL(url, host)`` ，它的返回值将决定是否启用代理。这里先给出一个小例子:

.. sourcecode:: javascript

    function FindProxyForURL(url, host) {
        if (dnsDomainIS(host, 'twitter.com')) {
            return 'PROXY proxy.example.com:8080';
        }
        return 'DIRECT';
    }


其中 ``dnsDomainIS`` 是 PAC 已有的函数，类似的还有：shExpMatch ， 如 shExpMatch(url, ``'*twitter.com*'``)

基本这两个就够用了，如果你想要更加灵活的写法，你可以选择正则表达式，同javascript里正则表达式的写法是一样的，这里就不多言了。

上例中的 return 值， 'DIRECT' 是一个关键字，表示不需要代理; 'PROXY proxy.example.com:8080' 是代理地址， 其中 PROXY 是协议名，如果你使用 SOCKS 代理，返回值可以是 'SOCKS5 127.0.0.1:7070' 或者 SOCKS4 127.0.0.1:7070'，取决于你所用的协议与端口。

大致原理若此，如想要更详细的资料，请参阅 `The Practical Proxy PAC File Guide <http://www.proxypacfiles.com/proxypac/>`_ ，拓展阅读 `Web Proxy Autodiscovery Protocol <http://en.wikipedia.org/wiki/Web_Proxy_Autodiscovery_Protocol>`_ 。

最后给出一个简单完整的PAC例子：

.. sourcecode:: javascript
 
    var proxy = 'SOCKS5 127.0.0.1:7070';
    var example_urls = [
        '*clients2.googleusercontent.com*',
        '*lesscss.org*'
    ]
    var example_hosts = [
        'twitter.com',
        '.twitter.com',
        'twimg.com',
        '.twimg.com',
        't.co',

        '.feedburnder.com',
        '.youtube.com',
        's.ytimg.com',
        '.blogspot.com',
        '.appspot.com'
    ]
    function FindProxyForURL(url, host) {
        for(i=0, i < example_hosts.length; i++) {
            if (dnsDomainIs(host, example_hosts[i])) {
                return proxy;
            }
        }
        for(i=0, i < example_urls.length; i++) {
            if (shExpMatch(url, example_urls[i])) {
                return proxy
            }
        }
        return 'DIRECT';
    }

Mac 可在 System Preferences -> Network -> Advanced -> Proxies 中设置代理，勾选 ``Automatic Proxy Configuration`` ，在URL处选择你的PAC文件。

.. _PAC: http://en.wikipedia.org/wiki/Proxy_auto-config
