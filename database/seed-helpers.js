const faker = require('faker');

const randomIntGenerator = (min, max) => {
  const ceilMin = Math.ceil(min);
  const floorMax = Math.floor(max);
  return Math.floor(Math.random() * (floorMax - ceilMin + 1)) + ceilMin;
};

const fakeComments = (() => {
  const comments = [];

  for (let i = 0; i < 4; i += 1) {
    comments.push({
      body: faker.lorem.sentence(),
      date: faker.date.between('2018-05-01', '2019-02-20'), // 2 review.date,
      comment_id: randomIntGenerator(1, 500),
      comment_author_name: faker.internet.userName(),
    });
  }

  return comments;
})();

// const buildFakeImages = n => {
//   let count = n; // eslint-disable-line
//   const imageUrls = [];

//   while (n > 0) {
//     imageUrls.push(faker.image.avatar());
//     count -= 1;
//   }

//   return imageUrls;
// };

const staticReviewData = (() => {
  return {
    author_id: randomIntGenerator(1, 500),
    author_name: faker.internet.userName(),
    body: faker.lorem.sentences(),
    likes: randomIntGenerator(0, 250),
  };
})();

const reviewGenerator = index => {
  return Object.assign(
    {},
    {
      // review_id: index,
      date: faker.date.between('2018-05-01', '2019-02-20'), // 2 review.date,
      review_star_rating: randomIntGenerator(0, 5),
      review_item_rating: randomIntGenerator(1, 100),
      comments: JSON.stringify(fakeComments),
    },
    staticReviewData
  );
};

// eslint-disable-next-line
const documentGenerator = () => {
  // const imagePool = buildFakeImages(20);
  return {
    item_name: faker.commerce.productName(),
    reviews: [...reviewGenerator(randomIntGenerator(0, 5))],
  };
};

const seed = batchSize => {
  const reviews = [];
  for (let i = 0; i < batchSize; i += 1) {
    reviews.push(reviewGenerator(i));
  }
  return reviews;
};

const asyncSeed = async (db, collectionSize = 10000000, batchSize = 500000) => {
  for (let i = 0; i < collectionSize; i += batchSize) {
    console.log('batching...', i); // eslint-disable-line
    console.log(process.memoryUsage()); // eslint-disable-line

    /* eslint-disable-next-line */
    await db
      .insertMany(seed(batchSize), { ordered: false })
      .catch(e => console.error('err', e)); // eslint-disable-line
  }
};

const asyncSeed1 = async (db, collectionSize = 10000000, batchSize = 500000, cs, pgp) => {
  for (let i = 0; i < collectionSize; i += batchSize) {
    console.log('batching...', i); // eslint-disable-line
    console.log(process.memoryUsage()); // eslint-disable-line

    /* eslint-disable-next-line */
    await db.none(pgp.helpers.insert(seed(batchSize), cs)) 
  }
};

module.exports = {
  asyncSeed,
  asyncSeed1
};
