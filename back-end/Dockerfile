FROM node:14.18.1

RUN npm install yarn

WORKDIR /workspace/strapi/app

ADD . /workspace/strapi/app/

RUN yarn install

EXPOSE 2021 8000

CMD [ "yarn", "develop"]