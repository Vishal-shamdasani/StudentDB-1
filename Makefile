# Define variables
NPM = npm
DOCKER = docker
DOCKER_COMPOSE = docker-compose

# Project paths
FRONTEND_DIR = ./frontend
BACKEND_DIR = ./backend

# Install dependencies
install:
	@echo "Installing backend dependencies..."
	cd $(BACKEND_DIR) && $(NPM) install
	@echo "Installing frontend dependencies..."
	cd $(FRONTEND_DIR) && $(NPM) install

# Start the app using Docker Compose
start:
	@echo "Starting the MERN stack with Docker..."
	$(DOCKER_COMPOSE) up --build

# Stop and clean Docker containers
stop:
	@echo "Stopping and cleaning up Docker containers..."
	$(DOCKER_COMPOSE) down

# Build the frontend for production
build:
	@echo "Building the frontend for production..."
	cd $(FRONTEND_DIR) && $(NPM) run build

# Lint backend and frontend code (Optional: Add ESLint to your project)
lint:
	@echo "Linting backend code..."
	cd $(BACKEND_DIR) && $(NPM) run lint
	@echo "Linting frontend code..."
	cd $(FRONTEND_DIR) && $(NPM) run lint

# Run backend tests (Optional: Add a test script to backend package.json)
test-backend:
	@echo "Running backend tests..."
	cd $(BACKEND_DIR) && $(NPM) test

# Run frontend tests (Optional: Add a test script to frontend package.json)
test-frontend:
	@echo "Running frontend tests..."
	cd $(FRONTEND_DIR) && $(NPM) test

# Clean all Docker containers and volumes (use with caution)
clean:
	@echo "Removing all Docker containers and volumes..."
	$(DOCKER_COMPOSE) down -v --rmi all --remove-orphans

# Rebuild and restart Docker containers
rebuild:
	@echo "Rebuilding Docker containers..."
	$(DOCKER_COMPOSE) up --build --force-recreate

# Seed MongoDB (Optional: Add a script to seed the database)
seed-db:
	@echo "Seeding the MongoDB database..."
	cd $(BACKEND_DIR) && $(NPM) run seed
