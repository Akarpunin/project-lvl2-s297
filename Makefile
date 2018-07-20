install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js -V

start_json:
	npm run babel-node -- src/bin/gendiff.js --format plain '__tests__/__fixtures__/before.json' '__tests__/__fixtures__/after.json'

start_yml:
	npm run babel-node -- src/bin/gendiff.js --format tree '__tests__/__fixtures__/before.yml' '__tests__/__fixtures__/after.yml'

start_ini:
	npm run babel-node -- src/bin/gendiff.js '__tests__/__fixtures__/before.ini' '__tests__/__fixtures__/after.ini'

test:
	npm test

publish:
	npm publish

lint:
	npm run eslint .
