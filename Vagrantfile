# -*- mode: ruby -*-
# vim: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "chef/centos-7.0"

  config.vm.provision "ansible" do |ansible|
    ansible.groups = {
      "databases" => ["default"],
    }
    ansible.playbook = "deploy/vagrant-playbook.yml"
  end
end

