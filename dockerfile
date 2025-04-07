FROM node:latest

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
