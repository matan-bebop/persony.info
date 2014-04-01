#!/bin/bash

mkdir /tmp/personcss/
mkdir /tmp/personcss/compiled
echo "Directory /tmp/personcss/compiled for css files was created. "
mkdir /tmp/sass-cashe
echo "Directory /tmp/sass-cashe for sass cashe files was created. "
ln -s /tmp/personcss/compiled/ /vagrant/app/styles/
echo "Symlink for css was created. "

echo "Environment prepared."
