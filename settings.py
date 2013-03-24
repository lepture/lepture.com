# -*- coding: utf-8 -*-
#: settings for liquidluck

#: site information
site = {
    'name': 'Just lepture',
    'url': 'http://lepture.com',
    'feed': 'http://feeds.lepture.com/lepture',
}

config = {
    'source': 'content',

    #: generate html to ouput
    'output': '_site',
    'static': '_site/static',
    #'static_prefix': '/static/',
    'permalink': '{{category}}/{{filename}}',
    'relative_url': False,
    'timezone': '+08:00',
}


author = {
    'default': 'lepture',
    'vars': {
        'lepture': {
            'name': 'Hsiaoming Yang',
            'website': 'http://lepture.com',
            'email': 'lepture@me.com',
        }
    }
}

#: active readers
reader = {
    'active': [
        'liquidluck.readers.markdown.MarkdownReader',
        'liquidluck.readers.restructuredtext.RestructuredTextReader',
    ],
}

#: active writers
writer = {
    'active': [
        'liquidluck.writers.core.PostWriter',
        'liquidluck.writers.core.PageWriter',
        'liquidluck.writers.core.ArchiveWriter',
        'liquidluck.writers.core.ArchiveFeedWriter',
        'liquidluck.writers.core.FileWriter',
        'liquidluck.writers.core.StaticWriter',
        'liquidluck.writers.core.YearWriter',
        'liquidluck.writers.core.CategoryWriter',
        'liquidluck.writers.core.CategoryFeedWriter',
        #'liquidluck.writers.core.TagWriter',
        'liquidluck.writers.core.TagCloudWriter',
    ],
    'vars': {
        'archive_output': 'archive.html',
    }
}

#: theme variables
theme = {
    'name': 'moment',
    'vars': {
        'disqus': 'lepture',
        'analytics': 'UA-21475122-1',
        'allow_comment_on_secret_post': True,

        'navigation': [
            {'title': 'Blog', 'link': '/archive'},
            {'title': 'Life', 'link': '/life/'},
            {'title': 'Work', 'link': '/work/'},
            {'title': u'Résumé', 'link': '/resume/'},
        ],
        'elsewhere': [
            {'name': 'GitHub', 'link': 'https://github.com/lepture'},
            {'name': 'Twitter', 'link': 'https://twitter.com/lepture'},
        ],

        'descriptions': {
            'life': u'生命是一襲華美的袍，爬滿了虱子 －－ 張愛玲',
            'work': 'works in python, javascript, vim, and everything else'
        },
    }
}
