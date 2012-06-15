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
# writers = {}
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
    'navigation': [
        ('Blog', '/archive/'),
        ('Life', '/life/'),
        ('Work', '/work/'),
        ('About', '/about/'),
    ],
    'elsewhere': [
        ('GitHub', 'https://github.com/lepture'),
        ('Twitter', 'https://twitter.com/lepture'),
    ],
}
