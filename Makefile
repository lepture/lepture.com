output=_site/assets/site

assets:
	@mkdir -p _site/assets
	@make -C _assets build

build:
	@writeup build

serve:
	@writeup serve

clean:
	@rm -fr _site
	@rm -fr .cache

clean-build: clean build

publish:
	@ghp-import _site -p -n
