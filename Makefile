build:
	liquidluck build

deploy:
	liquidluck build -v -s deploy.py

clean:
	rm -fr _site/
