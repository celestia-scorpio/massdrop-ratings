/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 3008;
/* eslint-disable-next-line */
const log = (...args) => console.log.apply(null, args);
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../client/dist`));

app.get('/loaderio-542e95bc816fed4e4e4814c5df92c345.html', () => {
  res.sendFile(path.join(__dirname, '../client/dist/'));
});

// serving static file
app.get('/products/:itemid', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
);

app.get('/api/products/:itemid/reviews', (req, res) => {
  const { db } = req.app.locals;
  const id = parseInt(req.params.itemid, 10);

  db.collection('products')
    .findOne({ _id: id })
    .then(review => res.send({ review }))
    .catch(e => res.send({ err: e }));
});

app.get('*', () =>
  res.sendFile(
    path.join(
      __dirname,
      '../client/dist/loaderio-542e95bc816fed4e4e4814c5df92c345.txt'
    )
  )
);

module.exports = db => {
  app.locals.db = db;
  app.listen(port, () => log(`App listening on port ${port}`));
};
