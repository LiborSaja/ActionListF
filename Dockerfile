# Node.js image
FROM node:20

# Working directory
WORKDIR /app

# Copy package.json a package-lock.json into container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all sources
COPY . .

# Port Vite dev server
EXPOSE 5173

# Run Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]

