#!/bin/bash
sudo apt-get update -y
sudo apt-get install nginx git zip curl wget php php-fpm php-mysql awscli certbot python3-certbot-nginx -y

sudo mkdir /var/www/php
cd /var/www/php/
sudo git clone https://github.com/Michelinico/BuildProyecto.git

sudo chown -R www-data:www-data /var/www/php
sudo rm -rf /etc/nginx/sites-available/parkingmiguel.es
cat <<'EOF' | sudo tee /etc/nginx/sites-available/parkingmiguel.es
server {
    listen 80;
    server_name parkingmiguel.miguelmarrod.es;
    root /var/www/php/BuildProyecto/build/;
    index index.html index.htm index.nginx-debian.html;
    location / {
        try_files $uri $uri/ /index.html?$query_string;
        allow all;
        client_max_body_size 10M;
        client_body_temp_path /var/www/php/BuildProyecto/tmp/;
        client_body_in_file_only on;
        client_body_buffer_size 128K;
        proxy_request_buffering off;
        proxy_buffering off;
        proxy_max_temp_file_size 0;
    }
    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    }
    location ~ /\.ht {
        deny all;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/parkingmiguel.es /etc/nginx/sites-enabled/
sudo unlink /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl stop apache2
sudo systemctl restart nginx

#sudo certbot --nginx -n -d parkingmiguel.miguelmarrod.es --email mmarrod466@g.educaand.es --agree-tos --redirect --hsts

sudo mkdir /root/.aws
cat <<'EOF' | sudo tee /root/.aws/credentials
[default]
aws_access_key_id=
aws_secret_access_key=
aws_session_token=
EOF

cat <<'EOF' | sudo tee /home/ubuntu/sincSerS3.sh
sudo aws s3 sync /var/www/php/BuildProyecto/build/CochesClientes/ s3://bucket-parking/CochesClientes/
sudo aws s3 sync /var/www/php/BuildProyecto/build/Avatares/ s3://bucket-parking/Avatares/
EOF

echo "*/20 * * * * /home/ubuntu/sincSerS3.sh" | crontab -

sudo chmod 777 /home/ubuntu/sincSerS3.sh
./home/ubuntu/sincSerS3.sh