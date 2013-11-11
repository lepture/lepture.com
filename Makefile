assets:
	@mkdir -p _site/assets
	@cat _assets/yue.css > _site/assets/site.css
	@cat _assets/font.css >> _site/assets/site.css
	@cat _assets/site.css >> _site/assets/site.css

publish:
	@rm -f _site/Makefile
	@ghp-import _site -p
	@git push origin master
