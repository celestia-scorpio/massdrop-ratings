// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import Review from './Review.jsx';
import { Style } from '../../../utilities/styles';

// submitReply={props.submitReply}
const generateReviews = props => {
  console.log(props.reviews);
  return (
    (props.reviews &&
      props.reviews.map(review => (
        <Review review={review} key={review.review_id} />
      ))) ||
    null
  );
};

const Reviews = props => <div>{generateReviews(props)}</div>;

export default Reviews;
