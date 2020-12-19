FROM node:12
ADD . /photo_client
WORKDIR /photo_client
COPY package.json /photo_client
COPY package-lock.json /photo_client
RUN rm -rf dist
RUN npm install --silent
COPY . /photo_client
RUN npm run build
EXPOSE 8081
CMD ["npm", "start"]