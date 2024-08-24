# Bookstore Web App

A full-stack bookstore application consisting of a React frontend and an Express backend, utilizing TypeScript and Docker for containerization. This guide will help you get started with both the frontend and backend development servers, including mock server setup, database management, and Docker Compose configuration.

## Table of Contents

- [Frontend](#frontend)
  - [Setup](#setup)
  - [Starting the Dev Server](#starting-the-dev-server)
  - [Mock Server](#mock-server)
- [Backend](#backend)
  - [Setup](#setup-1)
  - [Generating and Seeding the Database](#generating-and-seeding-the-database)
- [Docker Compose](#docker-compose)
  - [Commands](#commands)
  - [Docker Compose File](#docker-compose-file)
- [License](#license)
- [Author](#author)

## Frontend

The frontend is a React application built with Vite and TypeScript.

### Setup

Navigate to the frontend directory:

```bash
cd frontend
Install the dependencies:

bash
Copy code
yarn install
Starting the Dev Server
To start the Vite development server:

bash
Copy code
yarn dev
This will run the frontend application on http://localhost:5173.

Mock Server
To start the frontend with a mock server, which provides mock data for development:

Ensure you have json-server and concurrently installed, which are included in the devDependencies in your package.json.

Run the mock server alongside Vite:

bash
Copy code
yarn dev:mock
This command will start json-server on http://localhost:3001 and Vite on http://localhost:5173. The mock server uses db.json to provide mock data.

Backend
The backend is an Express application built with TypeScript and Prisma for database interactions.

Setup
Navigate to the backend directory:

bash
Copy code
cd backend
Install the dependencies:

bash
Copy code
yarn install
Generating and Seeding the Database
To set up the database, you'll need to run migrations and seed the database. Use the following commands:

Generate Prisma client and run migrations:

bash
Copy code
yarn prisma:migrate
This command will apply the database migrations.

Seed the database:

bash
Copy code
yarn prisma:seed
This command will populate the database with initial data.

Start the server:

bash
Copy code
yarn dev
This will start the Express server on http://localhost:3000.

Docker Compose
Docker Compose is used to manage multi-container Docker applications. The setup includes a frontend, backend, and PostgreSQL database.

Commands
Start the services:

bash
Copy code
yarn docker:compose:up
This command will build and start the services defined in docker-compose.yml. It also runs database migrations and seeds the database.

Stop the services:

bash
Copy code
yarn docker:compose:down
This command will stop and remove the containers.

Build the services:

bash
Copy code
yarn docker:compose:build
This command will build the Docker images for the services.

View logs:

bash
Copy code
yarn docker:compose:logs
This command will stream the logs from all services.

Docker Compose File
Here's a brief overview of the docker-compose.yml file:

backend:

Builds from the ./backend directory.
Uses DATABASE_URL to connect to the PostgreSQL database.
Runs Prisma migrations and seeds the database on startup.
frontend:

Builds from the ./frontend directory.
Exposes port 5173 for the Vite development server.
db:

Uses the official postgres:14 image.
Configured with environment variables for user, password, and database name.
Exposes port 5432.
License
This project is licensed under the ISC License.

Author
Ahmed Mamdouh