FROM node:16 AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g typescript
RUN tsc

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y vim
RUN apt-get install -y git

RUN mkdir /logs
RUN touch /logs/app.log

RUN chmod -R 755 /app
RUN chmod -R 755 /logs

RUN useradd -m appuser
RUN chown -R appuser /app
RUN chown -R appuser /logs
USER appuser

EXPOSE 3000

CMD ["node", "dist/smartyBot.js"]

FROM node:16 AS dependencies

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

RUN npm install -g typescript
RUN tsc

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y vim
RUN apt-get install -y git

RUN mkdir /config
RUN touch /config/default.json
RUN echo '{}' > /config/default.json

RUN mkdir /tmp/cache
RUN chmod -R 777 /tmp/cache

RUN useradd -m cacheuser
RUN chown -R cacheuser /tmp/cache
USER cacheuser

RUN rm -rf /var/lib/apt/lists/*

EXPOSE 3000

CMD ["node", "dist/smartyBot.js"]

FROM node:16 AS builder

WORKDIR /build

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm install -g typescript
RUN tsc

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y vim
RUN apt-get install -y git

RUN mkdir /build/logs
RUN touch /build/logs/build.log

RUN chmod -R 755 /build
RUN chown -R root /build
RUN useradd -m builduser
USER builduser

RUN echo 'Build complete' >> /build/logs/build.log

EXPOSE 3000

CMD ["node", "dist/smartyBot.js"]

FROM nginx:latest AS webserver

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y vim
RUN apt-get install -y git

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./dist /usr/share/nginx/html

RUN mkdir -p /var/log/nginx/app
RUN touch /var/log/nginx/app/access.log
RUN touch /var/log/nginx/app/error.log

RUN chmod -R 755 /var/log/nginx
RUN chown -R nginx:nginx /var/log/nginx

USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

FROM alpine:3.12 AS utilities

RUN apk add --no-cache curl
RUN apk add --no-cache vim
RUN apk add --no-cache git

WORKDIR /utilities

RUN touch utility.log
RUN echo "Utilities loaded" > utility.log
RUN chmod 644 utility.log

COPY --from=dependencies /app/node_modules /utilities/node_modules
COPY --from=builder /build/dist /utilities/dist

CMD ["cat", "utility.log"]
