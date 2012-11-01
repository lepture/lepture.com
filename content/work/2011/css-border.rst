CSS Border
===========================

:summary: 
    Create triangle with pure css, via css border property.

:date: 2011-10-21
:category: work
:public: false
:tags:
    - html
    - css


The model of css border:

.. image:: http://i.imgur.com/XRyDQ.png
   :alt: css border


If we set height and width to zero, what will it be like? Four triangles!

We know we can set ``border-color`` to ``transparent``, if we set three of the four to transparent,
we get a triangle! It's simple and easy, have a clear understanding with `CSS Border DEMO <http://lepture.com/demo/css-border/>`_

.. sourcecode:: css

    div {
        width: 0; height: 0;
        border: 30px solid transparent;
        border-top-color: black;
    }

The source code above is a drop down triangle, and Google implements its more button at the
top nav with such code.

What's more, we don't need to create a blank dom, we can create a triangle with ``:before`` and
``:after`` property in css.

.. sourcecode:: css

    div:before {
        content: "";
        border: 30px solid transparent;
        border-top-color: black;
    }

`More shapes via Reorx's sharing <http://css-tricks.com/examples/ShapesOfCSS/>`_
