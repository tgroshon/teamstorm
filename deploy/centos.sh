# Install Tools
yum -y install vim psmisc

# Install RethinkDB
wget http://download.rethinkdb.com/centos/6/`uname -m`/rethinkdb.repo \
          -O /etc/yum.repos.d/rethinkdb.repo
yum -y install rethinkdb

# Configure RethinkDB
cp rdb.conf.j2 /etc/rethinkdb/instances.d/instance1.conf
rethinkdb create --directory /var/lib/rethinkdb/rethinkdb_data
chown rethinkdb -R /var/lib/rethinkdb/rethinkdb_data/
chgrp rethinkdb -R /var/lib/rethinkdb/rethinkdb_data/

# Allow Admin Panel on Localhost Only
iptables -A INPUT -i eth0 -p tcp --dport 8080 -j DROP
iptables -I INPUT -i eth0 -s 127.0.0.1 -p tcp --dport 8080 -j ACCEPT

# Setup Systemd stuff
echo "d /run/rethinkdb 0755 rethinkdb rethinkdb -" > /usr/lib/tmpfiles.d/rethinkdb.conf
cp rdb.service.j2 /usr/lib/systemd/system/rethinkdb@.service
systemctl enable rethinkdb@instance1
systemctl start rethinkdb@instance1

