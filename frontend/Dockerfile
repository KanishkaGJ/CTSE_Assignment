# Use a base image with Node.js pre-installed
FROM node:latest

# Set the working directory inside the container
WORKDIR /app/frontend

RUN git clone https://github.com/KanishkaGJ/CTSE_Assignment -b main /app/frontend

# Copy package.json and package-lock.json to the working directory
# COPY package*.json ./
ADD package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the React app
CMD ["npm", "run", "dev"]
