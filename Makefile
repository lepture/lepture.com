build:
	liquidluck

deploy:
	liquidluck -v -f deploy.py

clean:
	rm -fr _site/
