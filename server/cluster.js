const { cpus } = require('os');
const { MongoClient } = require('mongodb');
const cluster = require('cluster');

const numWorkers = cpus().length;
const { isMaster } = cluster;
const app = require('./index');
/* eslint-disable-next-line */
const log = (...args) => console.log.apply(null, args);

require('dotenv').config();

MongoClient.connect(
  process.env.DB_CONN,
  { poolSize: 10, promiseLibrary: Promise, useNewUrlParser: true },
  (err, client) => {
    if (err) {
      log(`Failed to connect to the database. ${err.stack}`);
    } else if (isMaster) {
      log(`Forking ${numWorkers}`);
      [...Array(numWorkers)].map(() => cluster.fork());
    } else {
      log('Connected to database!!');
      app(client.db('massdrop-reviews'));
    }
  }
);
