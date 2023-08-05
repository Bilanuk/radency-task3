FROM node:20 
WORKDIR /express_app 
COPY package.json /express_app 
COPY yarn.lock /express_app
RUN yarn install 
COPY . /express_app
CMD yarn start 
EXPOSE 3000
