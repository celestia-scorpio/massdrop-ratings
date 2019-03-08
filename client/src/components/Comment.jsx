import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import moment from 'moment';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import { PersonAdd } from 'styled-icons/material/PersonAdd';
import { GroupAdd } from 'styled-icons/material/GroupAdd';
import { ThumbUp } from 'styled-icons/material/ThumbUp';
import { Reply } from 'styled-icons/material/Reply';
import { Style } from '../../../utilities/styles';

const CommentContainer = styled.div`
  display: block;
  width: 100%;
`;

const GrayReply = styled(Reply)`
  color: #849493;
  height: 1em;
  &:hover {
    color: #18d7cc;
  }
  cursor: pointer;
`;
const GrayThumbUp = styled(ThumbUp)`
  color: #849493;
  height: 1em;
  &:hover {
    color: #18d7cc;
  }
  cursor: pointer;
`;
const StyledAvatar = styled.img`
  display: inline-block;
  vertical-align: middle;
  max-width: 32px;
  max-height: 32px;
  border-radius: 50%;
  border: 1px solid #d9dede;
  margin-top: 10px;
  cursor: pointer;
`;
const StyledUsername = styled.div`
  display: inline-block;
  margin-left: 5px;
  font-weight: bold;
  font-size: 12px;
  &:hover {
    color: #18d7cc;
  }
  cursor: pointer;
`;
const LikesCount = styled.div`
display: inline-block;
	font-family: 'Lato';
	font-weight: bold;
	font-size: 11px;
    text-align: center;
	display: inline-block
	min-width: 20px;
    line-height: 14px;
	letter-spacing: 0.9px;
	color: #849493;
    border: solid #d6d6d6;
    border-width: 1px;
    border-radius: 3px;
    margin-left: 5px;
    margin-right: 0;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 1px;
    cursor: default;
`;
const TealPersonAdd = styled(PersonAdd)`
  display: inline-block;
  color: #14b6ad;
  height: 1.5em;
  margin-left: 10px;
  &:hover {
    color: #18d7cc;
  }
  cursor: pointer;
`;
const TealGroupAdd = styled(GroupAdd)`
  display: inline-block;
  color: #14b6ad;
  height: 1.5em;
  margin-left: 10px;
  &:hover {
    color: #18d7cc;
  }
  cursor: pointer;
`;
const StyledTime = styled.div`
  display: inline-block;
  float: right;
  vertical-align: middle;
  font-size: 12px;
  line-height: 20px;
  padding-top: 5px;
  padding-right: -4px;
`;
const StyledRepliedTo = styled.div`
  display: inline-block;
  font-weight: bold;
  font-size: 12px;
  background-color: #dcdcdc;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 50px;
  &:hover {
    color: #18d7cc;
  }
  cursor: pointer;
`;
const StyledCommentCard = styled.div`
  margin-left: 43px;
  background: gray;
  border: solid 1px black;
`;

const ReplyWrapper = styled.div`
  display: block;
`;
const StyledActiveSubmitButton = styled.button`
  cursor: pointer;
  letter-spacing: 0.9px;
  font-family: 'Lato';
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.9px;
  color: white;
  border-color: #14b6ad;
  border-radius: 3px;
  background: #14b6ad;
  min-width: 120px;
  margin-top: 8px;
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
  border-radius: 3px;
  background: #14b6ad;
  opacity: 0.3;
  min-width: 120px;
  margin-top: 8px;
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
  min-width: 120px;
  margin-top: 8px;
  margin-left: 20px;
`;

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdded: false,
      comment: props.comment,
      editorHtml: '',
      isEditorShown: false,
      quillPlaceholder: 'Add a reply...',
    };
    this.handleChange = this.handleChange.bind(this);
    this.createComment = this.createComment.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  createComment() {
    const { comment, editorHtml } = this.state;
    // console.log('comment', comment);
    this.props.submitReply(comment.comment_review_id, editorHtml);
    //axios post request  - saving components (comment from props)
    //is success - need to render without refreshing
    // e.preventDefault()
  }

  render() {
    const {
      body,
      comment_id,
      comment_author_name,
      date,
      comment_author_id,
      comment_body,
      comment_date,
      comment_replied_to_id,
      comment_review_id,
      creator_avatar,
      creator_id,
      creator_isDeleted,
      creator_isHidden,
      creator_likesQty,
      creator_name,
      replier_id,
      replier_isDeleted,
      replier_isHidden,
      replier_name,
    } = this.props.comment;

    return (
      <div style={{display: "block", width: "100%"}}>
        <div>
          <Style.UserAvatar img src={creator_avatar} />
          <Style.UserName>{comment_author_name}</Style.UserName>
          <Style.UserLikesCount>{creator_likesQty}</Style.UserLikesCount>
          {this.state.isAdded ? (
            <Style.TealGroupAdd />
          ) : (
            <Style.TealPersonAdd />
          )}
          <Style.UserDate>{date}</Style.UserDate>
          <br />
          <Style.UserName>{replier_name}</Style.UserName>
          <Style.ReviewBody>{body}</Style.ReviewBody>
        </div>
        <br />
        <div>
          <Style.GrayThumbUp />
          <div
            onClick={() => {
              this.setState({ isEditorShown: true });
            }}
          >
            Reply
          </div>
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
      </div>
    );
  }
}

export default Comment;
