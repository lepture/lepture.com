publish: css build upload

css:
	lessc --compress _static/less/screen.less > _static/css/screen.css

build:
	liquidluck --config .config --disable-log

deploy: css
	liquidluck --config deploy.ini

upload:
	rm -fr _site/_static/less
	rsync -av --del _site/ lepture.com:/www/lepture/lepture.com
	rm _static/css/screen.css
	@echo "Done..."
