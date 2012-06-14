publish: build upload

build:
	liquidluck

deploy:
	liquidluck -v -f deploy.py

clean:
	rm -fr _site/

upload:
	rsync -av --del _site/ linode.lepture.com:/home/lepture/www/lepture.com
