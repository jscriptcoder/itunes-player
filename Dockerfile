FROM node:14

WORKDIR /usr/app

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

# Add a new group and user
RUN addgroup --gid 1234 itunes
RUN useradd --shell /bin/bash --gid 1234 --uid 1234 itunes
RUN chown -R itunes:itunes /usr/app

# Switching to non-root user
USER itunes

CMD npm start