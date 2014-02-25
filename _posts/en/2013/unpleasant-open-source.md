# The Unpleasant Part of Open Source

- date: 2013-12-06 16:40
- tags: thought

I appreciate open source, I open source sometimes. But there are unpleasant
things in open source.

----

It has been 9 months since I sent the [renderer feature][#129] to marked.
It was merged some days ago, when I finally lost my patience and created
a forked project named [markit][markit].

I do not suggest you use markit right now. We are working on marked. And
we hope that renderer feature will be available soon.

----

Why it takes so much time for one pull request? Reason varies from people
to people. Maybe he is focusing on other projects. Maybe he just doesn't
like this feature. Maybe FUD.

> marked does so many weird optimizations that I'm worried only I understand
>
> — Christopher Jeffrey

I don't blame [Christopher Jeffrey](chjj). On the contrary, he did a
great job. marked is a well written, good designed project. I appreciate
his humility for I've read the code of markdown-js which I am just too
stupid to understand.

It is usually the fear of breaking things, the uncertainty of the changes,
and the doubt of the people that stops us.

----

We open source not because people need us. We just happen to open source
things that solve our problems, and wish it may help other people. Open
source can be a business for a company, but not for individuals.

> Lots of people in the Open Source community develop something that solve
> particular problems they have themselves.
>
> — Armin Ronacher

I created [Flask-OAuthlib](create-oauth-server) for my own, because I
needed to create an OAuth 2 server at that time. I contribute to OAuthLib,
because I need to fix that bug or add that feature for Flask-OAuthlib. I
don't contribute for my own amusement.

Armin Roncher wrote in his recent post [Emotional Programming in Open Source](http://lucumr.pocoo.org/2013/11/28/emotional-programming/):

> I found it quite hard this year to work on my own projects because the
> bug trackers were full of things I personally did not really care about.
> The things I wrote over the last few years all work so well for me, that
> I don't need to fix problems or add things.

That is true for individual devlopers. At least that is true for me.

Individual developers open source in their own time, they don't get paid.
However, sometimes, they are too good to accept features that they don't
care. This is the time for us to give our thanks, our stars and our tweets.

----

Our stars and tweets matter a lot. A good library should be promoted. Yes,
I mean [OAuthLib][oauthlib]. The funny things is that python-oauth2 has
more stars than OAuthLib. python-oauth2 is not really designed for OAuth 2,
it is OAuth 1. What a sarcastic reality!

That's why we should promote the good libraries. Let them to be known. This
encourages developers and makes them happy — but sometimes it may be a
burden to them.

It takes time to build a good library — the design, the documentation, and
the test cases.

----

Somtimes, when you finish a good project, a good name for your project is
already taken by another people. And when you find out that it is only a
spawn of a unix command, you feel angry that you have to name your project
as "something 2". That is really disappointed.

May you happy, may the developers happy.

> high quality of lots of Open Source code is that the developers are
> generally happier writing it


[#129]: https://github.com/chjj/marked/pull/129
[markit]: https://github.com/lepture/markit
[oauthlib]: https://github.com/idan/oauthlib
[chjj]: https://github.com/chjj/marked
