const connConfig = require('./secret');
const pgp = require('pg-promise')();
const { schema } = require('./postgres-helpers');
const { asyncSeed1 } = require('../seed-helpers')

const db = pgp(connConfig); // connection

// set static column set
const columnSet = pgp.helpers.ColumnSet([
  // {name: 'id', prop: 'review_id'},
  'date',
  {name: 'review_star_rating', def: 0},
  {name: 'review_item_rating', def: 0},
  'comments',
  'author_id',
  'author_name',
  'body',
  {name: 'likes', def: 0}
], { table: 'reviews' })

const initialize = (async function() {
  // await client.connect(); // async connection
  await db.any(schema); // create table

  // generate massive amounts of data for bulk insertion
  await asyncSeed1(db, 10000000, 200000, columnSet, pgp)
  console.log('done')
  await db.end();
})();
