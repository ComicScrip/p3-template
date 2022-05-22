FROM node:lts-alpine3.14

ENV PORT 80

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm i -g yarn
RUN yarn

# Copying source files
COPY . /usr/src/app

ARG DATABASE_URL=${DATABASE_URL}
ARG NEXT_PUBLIC_HCAPTCHA_SITEKEY=${NEXT_PUBLIC_HCAPTCHA_SITEKEY}
ARG NEXT_PUBLIC_UPLOADCARE_KEY=${NEXT_PUBLIC_UPLOADCARE_KEY}

# Building app
RUN yarn run pre-start

EXPOSE 80

# Running the app
CMD "yarn" "start"
