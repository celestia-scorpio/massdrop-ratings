/* eslint-disable no-undef */
const { MongoClient, ObjectID } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
// const utils = require('../utilities/utilities.js');
// const sqlite = require('../database/connect.js');
const port = process.env.PORT || 3008;

const app = express();

// require dotenvs
require('dotenv').config();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../client/dist`));

app.get('/loaderio-542e95bc816fed4e4e4814c5df92c345.html', () => {
  res.sendFile(path.join(__dirname, '../client/dist/'));
});

// serving static file
app.get('/products/:itemid', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/api/products/:itemid/reviews', (req, res) => {
  const { db } = req.app.locals;
  const id = new ObjectID(req.params.itemid);

  // item id
  db.collection('reviews')
    .findOne({ _id: id })
    .then(review => res.send({ review }))
    .catch(e => res.send({ err: e }));
});
// app.get('/api/products/:itemid/reviews', (req, res) => {
//   const sortMap = {
//     // eslint-disable-next-line prettier/prettier
//     'new': 'review_date DESC',
//     // eslint-disable-next-line prettier/prettier
//     'high': 'review_star_rating DESC',
//     // eslint-disable-next-line prettier/prettier
//     'low': 'review_star_rating ASC',
//     // eslint-disable-next-line prettier/prettier
//     'top': 'review_likes DESC',
//   };

//   const itemid = req.params.itemid;
//   const sortBy = req.query.sort;
//   let query = `SELECT * FROM reviews \
//                 JOIN users ON users.user_id = reviews.review_author_id \
//                 WHERE review_item_id="${itemid}"`;
//   query +=
//     req.query.like !== '' && req.query.like !== undefined
//       ? ` AND reviews.review_body LIKE '%${req.query.like}%'`
//       : '';
//   query += sortBy ? ` ORDER BY ${sortMap[sortBy]}` : '';
//   console.log(req.query.like)
//   console.log(req.params.itemid)
//   sqlite.all(query, (err, docs) => {
//     if (err) {
//       // eslint-disable-next-line no-console
//       console.log(
//         `could not get response from DB on item name ${itemid} - SERVER`,
//         err,
//       );
//       res.sendStatus(404);
//     } else {
//       const allReviewsWithComments = [];
//       const promises = [];
//       docs.forEach(review => {
//         const reviewWithComments = review;
//         const selectCreator = [
//           'creator.user_id AS creator_id',
//           'creator.user_avatar AS creator_avatar ',
//           'creator.user_name AS creator_name',
//           'creator.user_likesQty AS creator_likesQty',
//           'creator.user_isHidden AS creator_isHidden',
//           'creator.user_isDeleted AS creator_isDeleted',
//         ];
//         const selectReplier = [
//           'replier.user_id AS replier_id',
//           'replier.user_name AS replier_name',
//           'replier.user_isHidden AS replier_isHidden',
//           'replier.user_isDeleted AS replier_isDeleted',
//         ];
//         const selectComment = [
//           'comments.comment_id',
//           'comments.comment_date',
//           'comments.comment_author_id',
//           'comments.comment_replied_to_id',
//           'comments.comment_review_id',
//           'comments.comment_body',
//           'comments.comment_likes',
//         ];
//         const commentsQuery = `SELECT ${selectCreator.join(
//           ', ',
//         )}, ${selectReplier.join(', ')}, ${selectComment.join(
//           ', ',
//         )} FROM comments \
//             JOIN users AS creator ON creator.user_id = comments.comment_author_id \
//             JOIN users AS replier ON replier.user_id = comments.comment_replied_to_id \
//             WHERE comments.comment_review_id="${
//               review.review_id
//             }" ORDER BY comments.comment_date ASC`;

//         // eslint-disable-next-line no-unused-vars
//         // pushing promises
//         promises.push(
//           // eslint-disable-next-line no-unused-vars
//           new Promise((resolve, reject) => {
//             sqlite.all(commentsQuery, (error, response) => {
//               if (err) {
//                 // eslint-disable-next-line no-console
//                 console.log(
//                   'error on getting comments (inside Promise)',
//                   error,
//                 );
//               } else {
//                 reviewWithComments.comments = response;
//                 allReviewsWithComments.push(reviewWithComments);
//                 resolve();
//               }
//             });
//           }),
//         );
//       });

//       Promise.all(promises).then(() => {
//         res.send(allReviewsWithComments);
//       });
//     }
//   });
// });

app.put(`/api/users/:userId`, (req, res) => {
  const operation = req.query.likeType === 'plus' ? '+' : '-';
  const { userId } = req.params;
  const query = `UPDATE users SET user_likesQty=user_likesQty ${operation} 1 WHERE user_id=${Number(
    userId
  )}`;
  sqlite.exec(query, (err, response) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(`did not update likes for user ${userId}`, err);
    } else {
      res.sendStatus(200);
    }
  });
});

app.get('*', () => {
  res.sendFile(
    path.join(
      __dirname,
      '../client/dist/loaderio-542e95bc816fed4e4e4814c5df92c345.txt'
    )
  );
});

MongoClient.connect(
  process.env.DB_CONN,
  { promiseLibrary: Promise, useNewUrlParser: true },
  (err, client) => {
    if (err) {
      console.error(`Failed to connect to the database. ${err.stack}`);
    } else {
      console.log('Connected to database!!');
    }

    // inject database connection
    app.locals.db = client.db('massdrop-reviews');
    app.listen(port, () => {
      console.log(`Node.js app is listening at ${process.env.HOST}:${port}`);
    });
  }
);
