default: build publish

css:
	lessc --compress _static/src/screen.less > _static/css/tmp.screen.css
	lessc --compress _static/src/pygments.less > _static/css/tmp.pygments.css

js:
	uglifyjs -nc _static/src/jquery.min.js > _static/js/tmp.lepture.js
	uglifyjs -nc _static/src/lepture.js >> _static/js/tmp.lepture.js

build:
	liquidluck --config .config --disable-log

deploy: css
	liquidluck --config deploy.ini

publish:
	rm -fr _site/_static/src
	rsync -av --del _site/ linode.lepture.com:/home/lepture/project/lepture.com
	@echo "Done..."
