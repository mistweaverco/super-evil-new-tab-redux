#!/bin/bash

VERSION=$(jq -r .version < package.json)
FILENAME="addon-$VERSION.zip"
echo "Zipping $FILENAME"
zip -q -r "$FILENAME" \
	lib \
	bg \
	content \
	icons \
	manifest.json \
	bgcolor.js \
	newtab.* \
	options.* \
	sandbox.*
