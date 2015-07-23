
build: components index.js
	@component build -o ../_site/assets -n site

components: component.json
	@component install --dev

clean:
	rm -fr components

.PHONY: clean
