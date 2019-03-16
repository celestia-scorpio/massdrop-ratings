import React from 'react';
import Comment from './Comment.jsx';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import Stars from 'react-stars';
import { PersonAdd } from 'styled-icons/material/PersonAdd';
import { GroupAdd } from 'styled-icons/material/GroupAdd';
import { ThumbUp } from 'styled-icons/material/ThumbUp';
import { Reply } from 'styled-icons/material/Reply';
import { Style } from '../../../utilities/styles.js';
import { timeAgo } from '../../../utilities/utilities';

//   < div class="review-card" >
//     <div class="user">
//       <div class="user-pic"></div>
//       <div class="user-inner-wrap">
//         <div class="user-info">
//           <div class="user-nc">
//             <div class="user-name">Jwb4467</div>
//             <div class="user-count">0</div>
//           </div>
//           <div class="user-time">5W</div>
//         </div>
//         <div class="user-status">Verified purchaser</div>
//         <div class='review-body'>lnasdlgnldfngm,sdfng,msdfng msdfngmsdfngmsdfngmsdfngmsdfngmsdfngmsdfngmsdf ngmsdfngmsdfngmsdfngmsdfngmsdfngmsdfngms dfngmsdfngmsdfngmsdfng,mnsdf,mgnsdf,m ng,msdfbg,bm dsfbn,mvn adf,mgn</div>
//       </div>

//     </div>
// </div >

const StyledActiveSubmitButton = styled.button`
  cursor: pointer;
  letter-spacing: 0.9px;
  font-family: 'Lato';
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.9px;
  color: white;
  border-color: #14b6ad;
  border-radius: 1px;
  background: #14b6ad;
  min-width: 20px;
`;
const StyledDisabledSubmitButton = styled.button`
  cursor: default;
  letter-spacing: 0.9px;
  font-family: 'Lato';
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.9px;
  color: white;
  border-color: #14b6ad;
  border-radius: 1px;
  background: #14b6ad;
  opacity: 0.3;
  min-width: 20px;
`;
const StyledCancelButton = styled.button`
  cursor: pointer;
  font-family: 'Lato';
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.9px;
  color: #849493;
  border: none;
  background: none;
  min-width: 20px;
`;

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdded: false,
      comment: props.review,
      editorHtml: '',
      isEditorShown: false,
      quillPlaceholder: 'Add a reply...',
      isUserFollowed: false,
    };
    this.addFollower = this.addFollower.bind(this);
  }

  addFollower() {
    this.setState({ isUserFollowed: !this.state.isUserFollowed });
  }

  render() {
    const {
      review_author_id,
      body,
      review_date,
      review_id,
      review_item_id,
      review_rating,
      author_name,
      author_avatar,
      // user_id,
      // user_isDeleted,
      // user_isHidden,
      // user_isVerified,
      // user_likesQty,
      // user_name,
    } = this.props.review;

    const comments = JSON.parse(this.props.review.comments);

    // <Style.UserW>
    //   <div style={{ flex: 1 }}>
    //     <Style.UserAvatar src={author_avatar} />
    //   </div>
    //   <Style.UserDataW style={{ flex: 4 }}>
    //     <div>
    //       <Style.UserName>{author_name}</Style.UserName>
    //     </div>
    //     // <div>
    //       // <Style.UserLikesCount>{user_likesQty}</Style.UserLikesCount>
    // //     </div>
    // //     <div style={{ marginRight: 'auto' }}>
    // //       {this.state.isAdded ? (
    // //         <Style.TealGroupAdd />
    // //       ) : (
    // //         <Style.TealPersonAdd />
    // //       )}
    // //     </div>
    // //     <div>
    //       // <Style.UserDate>{timeAgo(review_date)}</Style.UserDate>
    //     // </div>
    //   </Style.UserDataW>
    // </Style.UserW>
    // {user_isVerified === 1 ? (
    //   <Style.isVerified>VERIFIED PURCHASER</Style.isVerified>
    // ) : null}

    //
    return (
      <Style.ReviewCard>
        <Style.UserW>
          <div style={{ flex: 1 }}>
            <Style.UserAvatar src={author_avatar} />
          </div>
          <Style.UserDataW style={{ flex: 4 }}>
            <div>
              <Style.UserName>{author_name}</Style.UserName>
            </div>
          </Style.UserDataW>
        </Style.UserW>
        <Style.ReviewW>
          <Style.ReviewBody>{body}</Style.ReviewBody>
          {comments &&
            comments.length &&
            comments.map(comment => (
              <Comment
                submitReply={this.props.submitReply}
                comment={comment}
                key={comment.comment_id}
              />
            ))}
          <div
            onClick={() => {
              this.setState({ isEditorShown: true });
            }}
          >
            {' '}
            REPLY
          </div>
          {this.state.isEditorShown ? (
            <div>
              <ReactQuill
                theme="snow"
                onChange={this.handleChange}
                value={this.state.editorHtml}
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                  ],
                  clipboard: {
                    matchVisual: false,
                  },
                }}
                formats={[
                  'bold',
                  'italic',
                  'underline',
                  'strike',
                  'list',
                  'bullet',
                  'link',
                  'image',
                ]}
                bounds={'.app'}
                placeholder={this.state.quillPlaceholder}
              />
              {this.state.editorHtml.length > 0 ? (
                <Style.ActiveSubmitButton onClick={this.createComment}>
                  SUBMIT
                </Style.ActiveSubmitButton>
              ) : (
                <Style.DisabledSubmitButton>SUBMIT</Style.DisabledSubmitButton>
              )}
              <Style.CancelButton
                onClick={() => {
                  this.setState({ isEditorShown: false });
                }}
              >
                CANCEL
              </Style.CancelButton>
            </div>
          ) : null}
        </Style.ReviewW>
      </Style.ReviewCard>
    );
  }
}
export default Review;
