publish: clean build upload

clean:
	rm -rf _build

build:
	felicis --config .config

deploy:
	felicis --config deploy.ini

upload:
	rsync -av --del _build/ lepture.com:/www/lepture/lepture.com
	@echo "Done..."
