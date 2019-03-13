// Retrieve
const { MongoClient } = require('mongodb');
const { asyncSeed } = require('../seed-helpers');
require('dotenv').config();

MongoClient.connect(process.env.DB_CONN, (err, client) => {
  if (err) {
    console.error('Error: ', err); // eslint-disable-line
    client.close();
  }

  const db = client.db('massdrop-reviews');
  const products = db.collection('products');
  products.drop();

  asyncSeed(products).then(() => {
    console.log('Database seeded!'); // eslint-disable-line
    client.close();
  });
});
