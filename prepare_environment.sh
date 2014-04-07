#!/bin/bash
# To run this scirpt properly set VAGRANT_DIR environment variable first. (c)webknjaz

CSS_COMPILED=/tmp/personcss/compiled
SASS_CASHE=/tmp/sass-cashe
STYLES_DIR="${VAGRANT_DIR:-/vagrant}/app/styles/"

mkdir -p "$CSS_COMPILED" 2>/dev/null && echo "Directory '$CSS_COMPILED' for css files was created. "
mkdir "$SASS_CASHE" 2>/dev/null && echo "Directory '$SASS_CASHE' for sass cashe files was created. "
ln -s "$CSS_COMPILED" "$STYLES_DIR" 2>/dev/null && echo "Symlink for css was created. "

[[ -d "$SASS_CASHE" && -L "$STYLES_DIR" ]] && echo "Environment prepared (hope so)."
