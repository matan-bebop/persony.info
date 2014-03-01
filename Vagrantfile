Vagrant.configure('2') do |config|
  # box to build from
  config.vm.box = 'precise32'

  # set RAM size to 512 MB
  config.vm.provider 'virtualbox' do |v|
    v.memory = 512
  end

  # the url from where the 'config.vm.box' box will be fetched if it
  # doesn't already exist on the user's system
  config.vm.box_url = 'http://files.vagrantup.com/precise32.box'

  config.vm.hostname = 'persony.info.internal'
  # networking. Application will be accessible as http://localhost:3000
  config.vm.network 'forwarded_port', :guest => 3000, :host => 3000

  # provision with Puppet stand alone
  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = 'puppet/manifests'
    puppet.module_path = 'puppet/modules'
  end
end