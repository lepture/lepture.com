PAC解析及其它
===================================

:summary: 編寫屬於自己的Proxy Auto Config，其實不難。如果你是前端的話，那簡直是小兒科了。
:date: 2011-09-29
:public: false
:category: work
:tags:
    - javascript


PAC_ (Proxy Auto Config) 是 Netscape 於1996年設計出來的，我不知道他們當時是出於何種心境，是出於何種需求。他們又何嘗想到，這一協議將會如何惠及到大陸仔呢！

閒話少敘，單表PAC。

PAC使用 javascript 語法（這當然是因為 Netscape），PAC 文件里必有的一個函數是 ``FindProxyForURL(url, host)`` ，它的返回值將決定是否啓用代理。這裡先給出一個小例子:

.. sourcecode:: javascript

    function FindProxyForURL(url, host) {
        if (dnsDomainIS(host, 'twitter.com')) {
            return 'PROXY proxy.example.com:8080';
        }
        return 'DIRECT';
    }


其中 ``dnsDomainIS`` 是 PAC 已有的函數，類似的還有：shExpMatch ， 如 shExpMatch(url, ``'*twitter.com*'``)

基本這兩個就夠用了，如果你想要更加靈活的寫法，你可以選擇正則表達式，同javascript里正則表達式的寫法是一樣的，這裡就不多言了。

上例中的 return 值， 'DIRECT' 是一個關鍵字，表示不需要代理; 'PROXY proxy.example.com:8080' 是代理地址， 其中 PROXY 是協議名，如果你使用 SOCKS 代理，返回值可以是 'SOCKS5 127.0.0.1:7070' 或者 SOCKS4 127.0.0.1:7070'，取決於你所用的協議與端口。

大致原理若此，如想要更詳細的資料，請參閱 `The Practical Proxy PAC File Guide <http://www.proxypacfiles.com/proxypac/>`_ ，拓展閱讀 `Web Proxy Autodiscovery Protocol <http://en.wikipedia.org/wiki/Web_Proxy_Autodiscovery_Protocol>`_ 。

最後給出一個簡單完整的PAC例子：

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

Mac 可在 System Preferences -> Network -> Advanced -> Proxies 中設置代理，勾選 ``Automatic Proxy Configuration`` ，在URL處選擇你的PAC文件。

.. _PAC: http://en.wikipedia.org/wiki/Proxy_auto-config

