# Load Balanced Time Server Example

This project demonstrates a simple load-balanced setup with:
- Static HTML page served by nginx
- Three Node.js time servers behind a load balancer
- Basic authentication for the time server endpoint

## Prerequisites

- Docker
- Docker Compose
- apache2-utils (for htpasswd creation)

## Setup Steps

1. Install required tools if not already installed:
```bash
# On Ubuntu/Debian
sudo apt-get update
sudo apt-get install apache2-utils
```

2. Create password file for authentication:
```bash
# Replace 'youruser' with desired username
htpasswd -c .htpasswd youruser
# Enter password when prompted
```

3. Build and start the services:
```bash
docker-compose up --build -d
```

## Testing the Services

1. Access the static page (no auth required):
```bash
curl http://localhost:8765
```

2. Access the time server (requires authentication):
```bash
# Replace youruser:yourpassword with your credentials
curl -u youruser:yourpassword http://localhost:8765/time
```

3. Test load balancing with multiple requests:
```bash
# Install Apache Bench if needed
sudo apt-get install apache2-utils

# Make 10 requests with 3 concurrent connections
ab -n 10 -c 3 -A youruser:yourpassword http://localhost:8765/time
```

## Project Structure

- `index.html` - Static webpage
- `server.js` - Node.js time server code
- `nginx.conf` - Nginx configuration with load balancing
- `Dockerfile.node` - Dockerfile for Node.js services
- `docker-compose.yml` - Service orchestration
- `.htpasswd` - Authentication credentials (created during setup)

## Available Endpoints

- `http://localhost:8765` - Static "Hello" page (no auth)
- `http://localhost:8765/time` - Load-balanced time server (requires auth)

## Stopping the Services

```bash
docker-compose down
```

## Notes

- Each time server has a 5-second delay to simulate heavy processing
- The load balancer uses round-robin distribution by default
- Only the /time endpoint requires authentication 