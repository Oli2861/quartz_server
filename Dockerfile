FROM debian:bookworm-slim
WORKDIR /app

# Install nginx
RUN apt-get update -y && \ 
    apt-get upgrade -y && \
    apt-get install curl git nginx cron -y && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Copy files
COPY build_quartz_pages build_quartz_pages
COPY init init
COPY nginx.conf /etc/nginx/nginx.conf

# Configure cron job
COPY cron_rebuild_site /etc/cron.d/cron_rebuild_site
RUN chmod 0644 /etc/cron.d/cron_rebuild_site
RUN touch /var/log/cron.log

# Prepare public dir from which nginx will serve files
RUN mkdir -p /var/www/quartz/public/* && chown -R www-data:www-data /var/www/quartz/public
RUN mkdir -p /app/quartz
RUN mkdir -p /app/repository

# Clone & build quartz
RUN git clone https://github.com/jackyzha0/quartz.git /app/quartz -b v4
RUN cd /app/quartz && npm install

# Run
CMD ["/bin/bash", "/app/init"]
