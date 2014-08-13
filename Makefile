output=_site/assets/site

assets:
	@mkdir -p _site/assets
	@make -C _assets build
	@cp _assets/font.css _site/assets/font.css
	@autoprefixer ${output}.css -o ${output}.css
	@cleancss ${output}.css --s0 -o ${output}.css
	@echo "require('lepture')" >> ${output}.js
	@uglifyjs ${output}.js -m -o ${output}.js

build:
	@writeup build

serve:
	@writeup serve

clean:
	@rm -fr _site
	@mkdir -p _site/assets
	@make -C _assets clean

publish:
	@ghp-import _site -p -n
	@ghp-import _site -b gitcafe-pages -r gitcafe -p
