FROM node

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY typings.json /app
RUN npm run postinstall

COPY . /app

EXPOSE 5555
CMD ["npm", "start"]