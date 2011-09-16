publish: build upload

clean:
	rm -rf _build

build:
	liquidluck --config .config

deploy:
	liquidluck --config deploy.ini

upload:
	rsync -av --del _build/ lepture.com:/www/lepture/lepture.com
	@echo "Done..."
