#!/bin/bash

VERSION=$(jq -r .version < package.json)
echo "$VERSION"
zip -r "addon-$VERSION.zip" \
	ace-editor \
	icons \
	manifest.json \
	newtab.* \
	options.* \
	sandbox.*
