publish: build upload

clean:
	rm -rf _site

build:
	liquidluck --config .config --disable-log

deploy:
	liquidluck --config deploy.ini

upload:
	rsync -av --del _site/ lepture.com:/www/lepture/lepture.com
	@echo "Done..."
