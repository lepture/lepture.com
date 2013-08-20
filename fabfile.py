# coding: utf-8

from fabric.api import cd, run, local, put, env

env.user = 'www'
env.hosts = ['linode.lepture.com']


def build():
    """Build the _site"""
    local('liquidluck build')


def clean():
    """Clean _site"""
    local('rm -fr _site')


def publish():
    """Publish _site to the server."""
    local('tar -czf lepture.tar.gz _site')
    run('mkdir -p ~/tmp')
    put('lepture.tar.gz', '~/tmp/')
    with cd('~/tmp'):
        run('tar xf lepture.tar.gz')
        run('rm -fr ~/website/lepture.com')
        run('mv _site ~/website/lepture.com')
    run('rm -fr ~/tmp')
    local('rm lepture.tar.gz')
