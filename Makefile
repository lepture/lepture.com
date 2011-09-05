all: clean build upload

clean:
	rm -rf _build

build:
	felicis

upload:
	rsync -av --del _build/ lepture.com:/www/lepture/lepture.com
	@echo "Done..."
