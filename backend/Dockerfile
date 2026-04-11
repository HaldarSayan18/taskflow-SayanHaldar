# 1. Use a lightweight Node.js image
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files first (this speeds up builds by caching layers)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your backend source code
COPY . .

# 6. Tell Docker the container will listen on port 4000
EXPOSE 4000

# 7. Start the server
CMD ["npm", "start"]