# Use official Node.js image as base
FROM node:16

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Build the React app
RUN npm run build

# Install and use nginx to serve the app
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose the frontend port
EXPOSE 3000
