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


Run

for development (inside vm will fail on xdg-open, so force should be used)
> grunt serve --force

for production
> npm start

Build

> grunt build

Test

> grunt test


Import Fake data

- Set DEBUG to true inside settings(or settings.local)

To import Persons, Events, Sources:

- Open http://localhost:3000/import

To generate relations between models

- Open http://localhost:3000/related/
