// Retrieve
const { MongoClient } = require('mongodb');
const { asyncSeed } = require('./seed-mongo-helpers');

const mongoUri = 'mongodb://localhost:27017';

MongoClient.connect(mongoUri, (err, client) => {
  if (err) {
    console.error('Error: ', err); // eslint-disable-line
    client.close();
  }

  const db = client.db('massdrop-reviews');
  const reviews = db.collection('reviews');
  reviews.drop();

  asyncSeed(reviews).then(() => {
    console.log('Database seeded!'); // eslint-disable-line
    client.close();
  });
});
