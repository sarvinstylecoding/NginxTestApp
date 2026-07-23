FROM node:24-alpine3.22 

# create user
RUN addgroup -S app && adduser -S app -G app

WORKDIR /app

# copy package files
COPY --chown=app:app package*.json ./

# install deps
RUN npm install
RUN npm install -g --froce nodemon 

# copy source
COPY --chown=app:app . .

# permissions
RUN chown -R app:app /app

# non-root user 
USER app

# port
EXPOSE 3001

# start app
CMD ["nodemon", "index"]