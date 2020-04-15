FROM node:12.14.1 as build-frontend

ADD ./frontend /frontend
RUN cd /frontend && npm ci && npm run build
RUN npm i -g serve

ENTRYPOINT ["serve", "/frontend/build"]

