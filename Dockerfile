FROM node:26-bookworm

ENV TZ="Europe/Moscow"

WORKDIR /home/project
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]