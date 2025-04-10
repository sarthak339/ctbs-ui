FROM node:latest

WORKDIR /app

WORKDIR /app
COPY package*.json ./


RUN npm install
COPY . .

# Define build-time variable
ARG NEXT_PUBLIC_API_URL

# Set it as environment variable so Next.js sees it
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL



# Build the app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
