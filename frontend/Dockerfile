# Use Node image
FROM node:20-alpine
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and start
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
