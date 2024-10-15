# Stage 1: Build Stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the source code
COPY . .

# Expose the application port (change if necessary)
EXPOSE 5005

# Start the backend API
CMD ["npm", "start"]
