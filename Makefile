output=_site/assets/site.css

assets:
	@mkdir -p _site/assets
	@cat _assets/yue.css > ${output}
	@cat _assets/pygments.css >> ${output}
	@cat _assets/site.css >> ${output}
	@cleancss ${output} -o ${output}
	@cp _assets/font.css _site/assets/font.css

build:
	@writeup build

publish:
	@ghp-import _site -p -n
