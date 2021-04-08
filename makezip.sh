#!/bin/bash

VERSION=$(jq -r .version < package.json)
FILENAME="addon-$VERSION.zip"
echo "Zipping $FILENAME"
zip -q -r "$FILENAME" \
	ace-editor \
	icons \
	manifest.json \
	newtab.* \
	options.* \
	sandbox.*
