# --- Preinstall Stage ---#

stage { 'preinstall':
  before => Stage['main']
}

# Handy tools good to have in dev environment
class tools {
  package { "mc": ensure => "installed" }
  package { "htop": ensure => "installed" }
  package { "git": ensure => "installed" }
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

# Install tools
class { 'tools':
  stage => preinstall
}

# --- NodeJS --- #

class { 'nodejs':
  version => 'v0.10.26'
}

class bower {
  package { 'bower':
    ensure => present,
    provider => 'npm',
    require => Class["nodejs"],
  }
}

include bower

# --- MySQL --- #

class { '::mysql::server':
  root_password   => 'mysql'
}