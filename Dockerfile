FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production && npm install pg

# Copy source code
COPY . .

# Build Strapi (optimize for production)
RUN npm run build

# Expose port
EXPOSE 1337

# Start Strapi in production mode
CMD ["npm", "start"]
