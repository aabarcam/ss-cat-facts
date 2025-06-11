FROM node:lts-alpine

WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
CMD [ "npm", "run", "dev", "--", "--port=8080", "--host=0.0.0.0" ]