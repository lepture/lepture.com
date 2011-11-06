publish: build upload

clean:
	rm -rf _site

build:
	liquidluck --config .config

deploy:
	liquidluck --config deploy.ini

upload:
	rsync -av --del _site/ lepture.com:/www/lepture/lepture.com
	@echo "Done..."
