# Stage 1: Build the React application
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) for caching and install dependencies
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the application
RUN yarn build

# Stage 2: Serve the application with nginx
FROM nginx:alpine

# Copy built assets from builder stage to nginx serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 5173 for the application
EXPOSE 5173

# Use default nginx configuration
# Optionally, you can add your custom nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
