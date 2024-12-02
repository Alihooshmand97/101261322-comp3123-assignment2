# Use official Node.js image as base
FROM node:16

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose the port the backend will run on
EXPOSE 5001

# Start the backend server
CMD ["node", "server.js"]
