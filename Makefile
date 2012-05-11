default: build publish

INPUT = _themes/slide/static
OUTPUT = _site/static

css:
	lessc --compress ${INPUT}/src/screen.less > ${INPUT}/css/tmp.screen.css
	lessc --compress ${INPUT}/src/pygments.less > ${INPUT}/css/tmp.pygments.css

js:
	uglifyjs -nc ${INPUT}/src/jquery.min.js > ${INPUT}/js/tmp.lepture.js
	uglifyjs -nc ${INPUT}/src/lepture.js >> ${INPUT}/js/tmp.lepture.js

build:
	liquidluck --config .config --disable-log

deploy:
	liquidluck --config deploy.ini
	cp -r ${INPUT} ${OUTPUT}

publish:
	rm -fr _site/_static/src
	rsync -av --del _site/ linode.lepture.com:/home/lepture/project/lepture.com
	@echo "Done..."
