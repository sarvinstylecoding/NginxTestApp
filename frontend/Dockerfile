# Use official Node.js runtime (Alpine version for smaller image size)
FROM node:24-alpine3.22

# Create a non-root group and user for security
RUN addgroup -S app && adduser -S app -G app

# Set working directory inside container
WORKDIR /app

# Change ownership of app directory to the non-root user
RUN chown -R app:app /app

# Switch to non-root user (security best practice)
USER app

# Copy package files first (for better Docker cache usage)
COPY --chown=app:app package*.json .

# Install dependencies
RUN npm install

# Copy all project files into container
COPY --chown=app:app . .

# Environment variable for backend API URL
# NOTE: In Docker Compose, this should usually be overridden there
ENV REACT_APP_API_URL=http://localhost:3001 

# Expose React development server port
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]