# -*- coding: utf-8 -*-
#: settings for liquidluck

#: posts lay here
source = 'content'

#: generate html to ouput
output = '_site'
static_output = '_site/static'

#: theme, load theme from _themes
theme = 'default'

permalink = '{{category}}/{{filename}}/'


#: site information
site = {
    'name': 'Just lepture',
    'url': 'http://dev.lepture.com',
    #'url': 'http://lepture.com',
    'feed': 'http://feeds.lepture.com/lepture',
}
author = 'lepture'
authors = {
    'lepture': {
        'name': 'Hsiaoming Yang',
        'website': 'http://lepture.com',
        'email': 'lepture@me.com',
    }
}

#: active readers
readers = ['markdown', 'rst']

#: active writers
writers = [
    'post',
    'page',
    'file',
    'static',
    'archive',
    'feed',
    'tag',
    'category',
]
writers_variables = {
    # ArchiveWriter
    'archive_output': 'archive.html',
}

#: template variables for rewrite themes variables
template_variables = {
    'nav_items': [
        ('Blog', '/archive/'),
        ('Life', '/life/'),
        ('Work', '/work/'),
        ('Links', '/links/'),
    ],
    'social_items': [
        ('GitHub', 'https://github.com/lepture'),
        ('Twitter', 'https://twitter.com/lepture'),
    ],
    'support': {
        #'disqus': 'lepture',
        #'analytics': 'UA-21475122-1',
    }
}

#: template filters
template_filters = {
}
