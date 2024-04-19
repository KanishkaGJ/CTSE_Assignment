# Use the official Node.js 16 as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app/backend

RUN git clone https://github.com/KanishkaGJ/CTSE_Assignment -b main /app/backend

# Copy the current directory contents into the container at /usr/src/app
# COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle the source code inside the Docker image
COPY . .

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the app when the container launches
CMD ["npm", "start"]

#CHANGE TO CHECK CICD pipeline
#Test CICD 