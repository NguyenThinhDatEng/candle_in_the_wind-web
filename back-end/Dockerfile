FROM node:14.18.1
RUN npm install yarn
WORKDIR /usr/src/app
COPY . ./
RUN yarn install
EXPOSE 1337
CMD ["yarn", "develop"]