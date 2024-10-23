# MongoDB Replica Set with Docker Compose

This repository contains a Docker Compose configuration for setting up a MongoDB replica set. The setup includes three MongoDB instances configured as a primary and two secondaries, enabling high availability and data redundancy.

## Getting Started

### Prerequisites

- Docker and Docker Compose should be installed on your machine.

### Clone the Repository

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bharathrajiva/mongodb-docker-replicaset.git
   cd ./mongodb-docker-replicaset
   ```

### Generate the Key File

To set up the MongoDB replica set with key authentication, you need to generate a key file that all MongoDB instances will use. Follow these steps:

1. **Generate the Key File**:
   Create a random key file using `openssl`:
   ```bash
   openssl rand -base64 756 > mongo-keyfile
   ```

2. **Set Permissions**:
   Ensure the key file has the correct permissions so that only the MongoDB user can read it:
   ```bash
   chmod 400 mongo-keyfile
   ```

3. **Change Ownership**:
   Change ownership of the key file to MongoDB's user (UID 999):
   ```bash
   sudo chown 999:999 mongo-keyfile
   ```

4. **Move the Key File**:
   Move the key file into your project directory to ensure it is correctly mounted in the Docker containers:
   ```bash
   mv mongo-keyfile ./mongo-keyfile
   ```

### Create the Necessary Volumes

This setup uses Docker volumes to persist data. The volumes will be created automatically when you run the Docker Compose command.

## Usage

### Start the Services

Run the following command to start the MongoDB instances:

```bash
docker compose -f multiNodeSetup.yml up --wait
```

### Connect to the Primary MongoDB Instance

You can connect to the primary instance using the following command:

```bash
docker exec -it mongo1 mongosh --port 27017
```

### Initiate the Replica Set (if not automatically done)

Inside the `mongosh` shell, initiate the replica set with the following command:

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

### Check the Status of the Replica Set

To check the current status of the replica set, run:

```javascript
rs.status()
```

## Health Checks

The MongoDB primary instance includes a health check that ensures the replica set is initialized. If the primary instance is not part of a replica set, it will automatically initiate the replica set when it starts.

## Accessing MongoDB

You can access the MongoDB instances through the following ports:
- **Primary**: `27017`
- **Secondary 1**: `27018`
- **Secondary 2**: `27019`

The connection URI for the replica set is:

```text
mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/?replicaSet=rs0
```

## Stopping the Services

To stop and remove the containers, use the following command:

```bash
docker compose -f multiNodeSetup.yml down
```

## Environment Variables

You can configure the following environment variables in your `docker-compose.yml` file:

- **MONGO_INITDB_ROOT_USERNAME**: Set the root username for MongoDB (default: `admin`).
- **MONGO_INITDB_ROOT_PASSWORD**: Set the root password for MongoDB (default: `bman192`).

## Volumes

The following Docker volumes are created for data persistence:

- `mongo1_data`
- `mongo2_data`
- `mongo3_data`
- `mongo1_config`
- `mongo2_config`
- `mongo3_config`

Ensure that your local setup has appropriate access to the key file and initialization script specified in the volume mounts.
