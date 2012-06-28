# -*- coding: utf-8 -*-
#: settings for liquidluck

#: posts lay here
source = 'content'

#: generate html to ouput
output = '_site'
static_output = '_site/static'
# static_prefix = '/static/'

#: theme, load theme from _themes
theme = 'moment'

permalink = '{{category}}/{{filename}}/'


#: site information
site = {
    'name': 'Just lepture',
    'url': 'http://lepture.com',
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
# readers = {}

#: active writers
writers = {
    'tagcloud': 'liquidluck.writers.core.TagCloudWriter'
}

writers_variables = {
    'archive_output': 'archive.html',
}

#: template variables for rewrite themes variables
template_variables = {
}

#: template filters
template_filters = {
}

#: theme variables
theme_variables = {
    'tagcloud': True,
    'disqus': 'lepture',
    'analytics': 'UA-21475122-1',

    'navigation': [
        ('Blog', '/archive/'),
        ('Life', '/life/'),
        ('Work', '/work/'),
        (u'Résumé', '/about/'),
    ],
    'elsewhere': [
        ('GitHub', 'https://github.com/lepture'),
        ('Twitter', 'https://twitter.com/lepture'),
    ],
}
