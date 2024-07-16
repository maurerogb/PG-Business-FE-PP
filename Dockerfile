# Use an official Node.js runtime as a base image

FROM node:20.10.0
 WORKDIR /app
 COPY package.json yarn.lock ./
 RUN yarn install
 COPY . .
#  COPY next.config.mjs ./next.config.mjs

#  COPY public  ./public
#  COPY src ./src
 CMD [ "yarn", "run", "dev" ]
 

#  RUN yarn build
#  COPY .next ./.next
 
