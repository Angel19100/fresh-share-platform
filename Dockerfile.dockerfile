# Use a lightweight Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy backend files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir flask flask-cors

# Expose Flask port
EXPOSE 5000

# Command to run the Flask app
CMD ["python", "app.py"]

