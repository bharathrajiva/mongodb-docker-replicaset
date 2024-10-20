# MongoDB Replica Set with Docker Compose
 This repository contains a Docker Compose configuration for setting up a MongoDB replica set. The setup includes three MongoDB instances configured as a primary and two secondaries, enabling high availability and data redundancy.
## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bharathrajiva/mongodb-docker-auth-replicaset.git
   cd ./mongodb-docker-auth-replicaset
   ```

2. **Create the necessary volumes**:
   This setup uses Docker volumes to persist data. The volumes will be created automatically when you run the Docker Compose command.

## Usage

1. **Start the services**:
   Run the following command to start the MongoDB instances:
   ```bash
   docker compose -f multiNodeSetup.yml up --wait
   ```

2. **Connect to the primary MongoDB instance**:
   You can connect to the primary instance using the following command:
   ```bash
   docker exec -it mongo1 mongosh --port 27017
   ```

3. **Initiate the replica set** (if not automatically done):
   Inside the `mongosh` shell, run:
   ```javascript
   rs.initiate({
     _id: 'rs0',
     members: [
       { _id: 0, host: "host.docker.internal:27017", priority: 1 },
       { _id: 1, host: "host.docker.internal:27018", priority: 0.5 },
       { _id: 2, host: "host.docker.internal:27019", priority: 0.5 }
     ]
   })
   ```

4. **Check the status of the replica set**:
   To see the current status of the replica set, run:
   ```javascript
   rs.status()
   ```

## Health Checks

The MongoDB primary instance includes a health check that ensures the replica set is initialized. If the primary instance is not part of a replica set, it will automatically initiate the replica set when it starts.

## Accessing MongoDB

You can access the MongoDB instances through the following ports:
- Primary: `27017`
- Secondary 1: `27018`
- Secondary 2: `27019`
- Connection URI: `mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/?replicaSet=rs0`
## Stopping the Services

To stop and remove the containers, use the following command:
```bash
docker compose -f multiNodeSetup.yml down
```