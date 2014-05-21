# --- Preinstall Stage ---#

stage { 'preinstall':
  before => Stage['main']
}

# Define the apt_get_update class
class apt_get_update {
  exec { 'apt-get -y update':
    path => ['/usr/sbin', '/usr/bin', '/sbin', '/bin']
  }
}

# Declare (invoke) the apt_get_update
class { 'apt_get_update':
  stage => preinstall
}

# Handy tools good to have in dev environment
class tools {
  package {['mc', 'htop', 'git', 'libapache2-mod-php5', 'php5-mcrypt', 'php5-mysql']:
    ensure => "installed",
    require => Class['apt_get_update']
  }
}

# Install tools
class { 'tools':
  stage => preinstall,
  require => Class['apt_get_update']
}

# Downloads and deployes PMA under /var/www/
class pma {
  exec { 'rm -f /var/www/index.html; wget https://github.com/phpmyadmin/phpmyadmin/archive/RELEASE_4_1_11.zip -O /tmp/pma.zip; unzip /tmp/pma.zip -d /tmp; mv /tmp/phpmyadmin-RELEASE_4_1_11/* /var/www/; rm /tmp/pma.zip; rm -rf /tmp/phpmyadmin-RELEASE_4_1_11/; service apache2 restart':
    path => ['/usr/sbin', '/usr/bin', '/sbin', '/bin'],
    creates => '/var/www/index.php'
  }
}

# Install pma
class { 'pma':
  require => Class['tools']
}

# Ruby
class ruby {
  package {['ruby1.9.3']:
    ensure => "installed",
    require => Class['apt_get_update']
  }
}

include ruby

# --- NodeJS --- #

class { 'nodejs':
  version => 'v0.10.26'
}

class node_tools {
  package {['xdg-utils']:
    ensure => "installed"
  }
  package { ['bower', 'grunt-cli', 'supervisor']:
    ensure => present,
    provider => 'npm',
    require => Class["nodejs"],
  }
  package { ['compass']:
    ensure => present,
    provider => 'gem',
    require => Class['ruby']
  }
}

include node_tools

# --- MySQL --- #

class { '::mysql::server':
  root_password   => 'mysql'
}

mysql_database { 'personDB':
  ensure  => 'present',
  charset => 'utf8',
  collate => 'utf8_unicode_ci',
}