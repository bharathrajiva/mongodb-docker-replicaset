// init-mongo.js
rs.initiate({
  _id: 'rs0',
  members: [
    { _id: 0, host: 'host.docker.internal:27017', priority: 1 },
    { _id: 1, host: 'host.docker.internal:27018', priority: 0.5 },
    { _id: 2, host: 'host.docker.internal:27019', priority: 0.5 }
  ]
});

db.createUser({
  user: 'admin',
  pwd: 'examplePassword',
  roles: [{ role: 'root', db: 'admin' }]
});
