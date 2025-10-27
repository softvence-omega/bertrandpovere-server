# Step 1: Use official Node.js image
FROM node:18

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the TypeScript code
RUN npm run build

# Step 7: Expose port (Express app runs on port 5000)
EXPOSE 5000

# Step 8: Start the server
CMD ["node", "dist/server.js"]
