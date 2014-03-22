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

# Handy tools good to have in dev environment
class tools {
  package {['mc', 'htop', 'git', 'virtualbox-guest-additions']:
    ensure => "installed"
  }
}

# Declare (invoke) the apt_get_update
class { 'apt_get_update':
  stage => preinstall
}

# Install tools
class { 'tools':
  stage => preinstall,
  require => Class['apt_get_update']
}

# --- NodeJS --- #

class { 'nodejs':
  version => 'v0.10.26'
}

class node_tools {
  package {['xdg-utils']:
    ensure => "installed"
  }
  package { ['bower', 'grunt-cli']:
    ensure => present,
    provider => 'npm',
    require => Class["nodejs"],
  }
}

include node_tools

# --- MySQL --- #

class { '::mysql::server':
  root_password   => 'mysql'
}