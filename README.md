# Full Stack Notes Application

This is a full-stack Notes application built with React, Node.js, Express, MongoDB, Socket.io and Redis.

## Technologies Used

- React
- Node.js
- Express
- MongoDB
- Redis
- Socket.io
- Docker
- Docker Compose


## Prerequisites

- Docker
- Docker Compose

## Getting Started

To start the application using Docker, follow these steps:

1.  Clone the repository:

    ```bash
    git clone https://github.com/RaunakDasgupta/fullstack_task_Raunak.git
    cd fullstack_task_Raunak
    ```

2.  Run Docker Compose:

    ```bash
    docker-compose up --build
    ```

    This command will build the Docker images and start the containers for the backend, frontend, and MongoDB.

3.  Access the application:

    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend: [http://localhost:3001](http://localhost:3001)

## Configuration

### Env file

Sample env file is provided in `backend/.env.sample`.

### Redis

The Redis configuration is located in `backend/src/config/redis.ts`.

- Host: `redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com`
- Port: `12675`
- Username: `default`
- Password: `dssYpBnYQrl01GbCGVhVq2e4dYvUrKJB`

### MongoDB

The MongoDB configuration is located in `backend/src/config/database.ts`.

- DB URL: `mongodb+srv://assignment_raunak:kazam@cluster0.kaij9yp.mongodb.net/`
- Database: `test`
- Collection: `tasks`

## Docker Compose

The `docker-compose.yml` file defines the services, networks, and volumes for the application. It also sets the environment variables for the backend service, including the MongoDB URI and Redis configuration.
