
FROM node:16 AS build

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build


FROM nginx:alpine as runtime
COPY --from=build /app/dist/sai-web-app /usr/share/nginx/html
COPY --from=build /app/bootstrap.sh /bootstrap.sh

EXPOSE 80

CMD ["sh", "/bootstrap.sh"]
