FROM node:latest

WORKDIR /app

WORKDIR /app
COPY package*.json ./


RUN npm install
COPY . .
# Build the app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
