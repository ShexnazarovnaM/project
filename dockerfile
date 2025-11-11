FROM node:25-alpine3.21
WORKDIR /myapp
COPY package.json /myapp/
RUN npm install
COPY . /myapp/
EXPOSE 3000
CMD ["npm", "start"]