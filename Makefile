publish: js css build upload

css:
	lessc --compress _static/src/screen.less > _static/css/tmp.screen.css

js:
	uglifyjs -nc _static/src/jquery.min.js > _static/js/tmp.lepture.js
	uglifyjs -nc _static/src/lepture.js >> _static/js/tmp.lepture.js

build:
	liquidluck --config .config --disable-log

deploy: css
	liquidluck --config deploy.ini

upload:
	rm -fr _site/_static/src
	rsync -av --del _site/ lepture.com:/www/lepture/lepture.com
	@echo "Done..."
