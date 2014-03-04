persony.info
============

main repo for persony.info
Basic requirements:

Node (+npm, bower [npm install bower], grunt [npm install grunt])

Mysql

Local deploy:

Create database and set appropriate settings in ./conf/settings.js database section


> npm install

> bower install

> node ./utils/syncdb

> node ./utils/import_data



Run

for development (inside vm will fail on xdg-open, so force should be used)
> grunt serve --force

for production
> npm start

Build

> grunt build

Test

> grunt test
