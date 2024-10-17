# MongoDB Replica Set with Docker Compose
 This repository contains a Docker Compose configuration for setting up a MongoDB replica set. The setup includes three MongoDB instances configured as a primary and two secondaries, enabling high availability and data redundancy.
## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bharathrajiva/mongodb-docker-replicaset.git
   cd ./mongodb-docker-replicaset
   ```

2. **Create the necessary volumes**:
   This setup uses Docker volumes to persist data. The volumes will be created automatically when you run the Docker Compose command.

3. **Generate the Key File**:
   ```bash
   openssl rand -base64 756 > mongo-keyfile
   ```

4. **Set Permissions**:
   ```bash
   chmod 400 mongo-keyfile
   ```

5. **Change ownership of the key file**:
   ```bash
   sudo chown 999:999 mongo-keyfile
   ```

3. **Move the Key File**:
   ```bash
   mv mongo-keyfile ./mongo-keyfile
   ```


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

Sure! Here’s an updated README section that includes details about generating the key file for the MongoDB replica set. This section can be placed under the **Environment Variables** or a new section titled **Key Generation**. 

### Key Generation

To set up the MongoDB replica set with key authentication, you need to generate a key file that all MongoDB instances will use. Here’s how to create the key file:

1. **Generate the Key File**:
   You can create a key file using the `openssl` command. Run the following command to generate a random key:

   ```bash
   openssl rand -base64 756 > mongo-keyfile
   ```

2. **Set Permissions**:
   Ensure the key file has the correct permissions so that only the MongoDB user can read it. Run:

   ```bash
   chmod 400 mongo-keyfile
   ```

3. **Move the Key File**:
   Place the generated key file in your project directory so that it can be mounted in the MongoDB containers. 

   ```bash
   mv mongo-keyfile ./mongo-keyfile
   ```

4. **Verify the Key File**:
   Ensure that the key file is correctly formatted and accessible to your Docker setup. It should be in the same directory as your `docker-compose.yml` file.

### Updated Example of the README with Key Generation Section

Here’s how the updated README might look with the Key Generation section added:

```markdown
# MongoDB Replica Set with Docker Compose

This repository contains a Docker Compose configuration for setting up a MongoDB replica set. The setup includes three MongoDB instances configured as a primary and two secondaries, enabling high availability and data redundancy.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/install/) should be installed on your machine.

### Clone the Repository

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bharathrajiva/mongodb-docker-replicaset.git
   cd ./mongodb-docker-replicaset
   ```

4. **Verify the Key File**:
   Ensure that the key file is correctly formatted and accessible to your Docker setup.

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

### Check the Status of the Replica Set

To see the current status of the replica set, run:
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
- **Connection URI**: `mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/?replicaSet=rs0`

## Stopping the Services

To stop and remove the containers, use the following command:
```bash
docker compose -f multiNodeSetup.yml down
```

## Environment Variables

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This addition provides clear instructions for generating and managing the key file, which is essential for securing your MongoDB replica set. Let me know if you need any more modifications!