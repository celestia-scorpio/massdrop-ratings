/* eslint-disable no-console */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReviewsTab from './components/ReviewsTab.jsx';
import Search from './components/Search.jsx';
import Sort from './components/Sort.jsx';
import Reviews from './components/Reviews.jsx';
import Comment from './components/Comment.jsx';
import { Style } from '../../utilities/styles.js';

var amazon = 'http://ec2-18-212-192-142.compute-1.amazonaws.com';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      showMenu: false,
      searchQuery: '',
      selectedOption: 'new',
      sortOptions: [
        // eslint-disable-next-line prettier/prettier
        {
          key: 'new',
          value: 'NEWEST',
        },
      ],
      // currentItem: ''
    };
    this.getReviews = this.getReviews.bind(this);
    this.changeSortOrder = this.changeSortOrder.bind(this);
    this.clearQuery = this.clearQuery.bind(this);
    this.submitReply = this.submitReply.bind(this);
    this.updateUserLikes = this.updateUserLikes.bind(this);
    this.searchTerm = this.searchTerm.bind(this);
  }

  componentDidMount() {
    let itemid = window.location.pathname.split('/')[2];
    this.getReviews(itemid, this.state.selectedOption);
  }

  // .get(
  //   `http://localhost:3008/api/products/${itemid}/reviews?sort=${selectedOption}&like=${like}`,
  // )
  getReviews(itemid, selectedOption, like = '') {
    axios
      .get(`${amazon}/api/products/${itemid}/reviews`)
      .then(({ data }) => {
        const result = [data.review];
        this.setState({ reviews: result });
      })
      .catch(error =>
        console.log('Error getting all reviews from DB:    ', error)
      );
  }
  changeSortOrder(e) {
    e.preventDefault();
    this.setState({
      selectedOption: e.target.value,
      showMenu: false,
    });
  }
  clearQuery() {
    this.setState({ searchQuery: '' });
  }

  searchTerm(term) {
    this.getReviews(param1, param2, searchQuery);
  }
  submitReply(reviewId, commentObj) {
    console.log('submitting reply with', reviewId, commentObj);
    this.setState();
    //axios post request to save comment object to DB to a specific review
    //grab html comment obj
    //.then = map reviews, find review by ID and push the commentObj into comments array - spread operator - in this case we can push new comment into comments array
  }
  //reply button click handler
  //open editor and header for comment creation and 2 buttons - submit and cancel
  //function submit reply
  //take the object with 2 ID , text, etc and save to DB
  // pass the function down to Comment

  updateUserLikes(userId, likeType = 'plus') {
    axios
      .put(`${amazon}/api/users/${userId}`, { params: { likeType } })
      // .put(`/api/users/${userId}`, { params: { likeType } })
      .then(response => {
        console.log('user likes were updated', response);
      })
      .catch(error => console.log('error update likes in DB:    ', error));
  }

  render() {
    return (
      <Style.AppOuterWrapper>
        <ReviewsTab reviewsQuantity={this.state.reviews.length} />
        <Style.SearchSortWrapper>
          <Search clearQuery={this.clearQuery} searchFor={this.searchTerm} />
          <Sort
            changeSortOrder={this.changeSortOrder}
            sortOptions={this.state.sortOptions}
            selectedOption={this.state.selectedOption}
          />
        </Style.SearchSortWrapper>
        <Style.ReviewsCommentsWrapper>
          <Reviews
            reviews={this.state.reviews}
            submitReply={this.submitReply}
          />
        </Style.ReviewsCommentsWrapper>
      </Style.AppOuterWrapper>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
