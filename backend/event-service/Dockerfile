#Updated Dockerfile

# Use the official Node.js 16 as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle the source code inside the Docker image
COPY . .

# Make port 8070 available to the world outside this container
EXPOSE 8070

# Run the app when the container launches
CMD ["npm", "start"]

#Check CICD build and deploy of the event-service microservice

