FROM node:12
ADD . /photo_client
WORKDIR /photo_client
COPY package.json .
RUN npm install && npm run build
EXPOSE 3000
COPY . .
CMD ["npm", "start"]