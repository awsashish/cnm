FROM zzrot/alpine-caddy
COPY Caddyfile /etc/Caddyfile
COPY dist/ /var/www/html
