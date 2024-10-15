# Stage 1: Build the React app
FROM node:14-alpine as build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy built React files to Nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config if needed (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3009

CMD ["nginx", "-g", "daemon off;"]
