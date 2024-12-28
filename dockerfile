#Dockerfile v2
# 1. React 빌드
FROM node:18 AS builder
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Nginx 설정
FROM nginx:latest
COPY --from=builder /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
