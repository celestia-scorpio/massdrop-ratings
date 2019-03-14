const faker = require('faker');

const randomIntGenerator = (min, max) => {
  const ceilMin = Math.ceil(min);
  const floorMax = Math.floor(max);
  return Math.floor(Math.random() * (floorMax - ceilMin + 1)) + ceilMin;
};

const fakeComments = JSON.stringify(
  (() => {
    const comments = [];

    for (let i = 0; i < 2; i += 1) {
      comments.push({
        body: faker.lorem.sentence(),
        date: faker.date.between('2018-05-01', '2019-02-20'), // 2 review.date,
        comment_id: randomIntGenerator(1, 500),
        comment_author_name: faker.internet.userName(),
      });
    }

    return comments;
  })()
);

const staticReviewData = (() => {
  return {
    author_id: randomIntGenerator(1, 500),
    author_name: faker.internet.userName(),
    author_avatar:
      'https://s3.amazonaws.com/uifaces/faces/twitter/dudestein/128.jpg',
    body: faker.lorem.sentences(),
    likes: randomIntGenerator(0, 250),
  };
})();

const reviewGenerator = index => {
  return Object.assign(
    {},
    {
      review_id: index,
      date: faker.date.between('2018-05-01', '2019-02-20'), // 2 review.date,
      review_star_rating: randomIntGenerator(0, 5),
      review_item_rating: randomIntGenerator(1, 100),
      comments: fakeComments, // static data
    },
    staticReviewData
  );
};

// eslint-disable-next-line
const documentGenerator = index => {
  return {
    _id: index,
    reviews: (() => {
      const reviews = [];
      const numberToGenerate = randomIntGenerator(1, 5);
      for (let i = 0; i < numberToGenerate; i++) {
        reviews.push(reviewGenerator(i));
      }
      return reviews;
    })(), // inline iffe :: void 0 -> Array[Reviews]
  };
};

const seed = (idx = 0, batchSize) => {
  const docs = [];
  for (let i = 0; i < batchSize; i += 1) {
    docs.push(documentGenerator(idx++));
  }
  return docs;
};

const asyncSeed = async (db, collectionSize = 10000000, batchSize = 500000) => {
  let entryIndex = 1;

  for (let i = 0; i < collectionSize; i += batchSize) {
    console.log('batching...', i); // eslint-disable-line
    console.log(process.memoryUsage()); // eslint-disable-line

    /* eslint-disable-next-line */
    try {
      await db.insertMany(seed(entryIndex, batchSize), { ordered: false });
      entryIndex += batchSize; // increase the batch size
    } catch (e) {
      console.error(`An error has occurred: ${e}`);
      process.exit(1);
    }
  }
};

// ugly postgres
const asyncSeed1 = async (
  db,
  collectionSize = 10000000,
  batchSize = 500000,
  cs,
  pgp
) => {
  for (let i = 0; i < collectionSize; i += batchSize) {
    console.log('batching...', i); // eslint-disable-line
    console.log(process.memoryUsage()); // eslint-disable-line

    /* eslint-disable-next-line */
    await db.none(pgp.helpers.insert(seed(batchSize), cs));
  }
};

module.exports = {
  asyncSeed,
  asyncSeed1,
};
