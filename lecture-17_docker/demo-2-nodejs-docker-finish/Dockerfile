FROM node
WORKDIR /app

# only copy package files and install
# so it will only npm install when the
# package files are modified 
COPY package.json package-lock.json ./
RUN npm install

# copy rest of files
COPY . .

# Allow container to listen on port 3000
EXPOSE 3000 

# when container starts run "npm start"
ENTRYPOINT ["npm", "start"]

