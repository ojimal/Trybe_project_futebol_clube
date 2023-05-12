# Use the node:16.14-alpine image as a base
FROM node:16.14-alpine

# Change to working directory /app-frontend
WORKDIR /app-frontend

# Copy package.json and package-lock.json to container
COPY package* ./

# Install Node dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Application exposes port 3000
EXPOSE 3000

# Configure the commands to start the application according to best practices
ENTRYPOINT ["npm", "run"]
CMD ["start"]
# Dica: Leia a seção Docker e Docker-compose no README para mais informações