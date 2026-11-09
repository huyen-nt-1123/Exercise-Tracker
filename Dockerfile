# ---- Stage 1: build the static site with Node ----
FROM node:24-alpine AS build
WORKDIR /app

# Copy only the dependency manifests first. Docker caches each layer, so
# `npm ci` is skipped on rebuilds unless package*.json actually changed.
COPY package.json package-lock.json ./
RUN npm ci

# Now copy the source and build. Changing src/ only invalidates from here down.
COPY . .
RUN npm run build

# ---- Stage 2: serve dist/ with nginx ----
# The unprivileged variant runs as a non-root user and listens on 8080.
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
# The base image's default CMD starts nginx in the foreground.
