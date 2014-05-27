output=_site/assets/site

assets:
	@mkdir -p _site/assets
	@make -C _assets build
	@cleancss ${output}.css -o ${output}.css
	@echo "lepture=require('lepture')" >> ${output}.js
	@cp _assets/font.css _site/assets/font.css

build:
	@writeup build

publish:
	@ghp-import _site -p -n
	@ghp-import _site -b gitcafe-pages -r gitcafe -p
