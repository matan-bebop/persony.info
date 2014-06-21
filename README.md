persony.info
============

main repo for persony.info project

Basic requirements
------------------

* Node
    * npm
    * bower [npm install bower]
    * grunt [npm install grunt]
* Ruby
    * compass
* Mysql

Local deploy
------------

Working environment can be created with [Vagrant](http://www.vagrantup.com/) and [VirtualBox](https://www.virtualbox.org/)
Install them and then run the following commands in project home directory

> git submodule update --init
> vagrant up

You can get inside VM running following command under the project home directory
> vagrant ssh

Project will be mounted inside VM at the */vagrant* directory
> cd /vagrant

Database is created by puppet, and default credentials are root:mysql, which corresponds with config stored in git.

Application configuration is stored in **[project_root]/config/settings.js** file.
It also has an information of how to override any of the settings with **[project_root]/config/settings.local.js** file

Please make sure you are inside project home directory of the run environment
(if you are using development VM, this will be /vagrant directory inside it)

> npm install

> bower install

> node ./utils/syncdb


*Run*

for development you may use one of the options of your choice
* ./devrun.sh
* npm start
* grunt serve --force

for production (environment variable should be somehow defined: export NODE_ENV="production")
> node server.js

*Build*

> grunt build

*Test*

> grunt test


SASS
-----

\*.scss files should be located in **[project root]/app/styles/sass/** directory
and they will be served as **/app/styles/compiled/\*.css**

Database
--------

Inside development environment PhpMyAdmin will be available on *http://localhost:8000/*

Populate database
-----------------

Real-life data is stored in the **testdata/dump.sql**. To restore the dump, execute

> mysql -u root -pmysql personDB < /vagrant/testdata/dump.sql
