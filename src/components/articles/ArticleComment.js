import React, { useState } from 'react';

import { getFormattedDateText } from '../../utils/';
import { getCommentReplies, createReply } from '../../actions/ApiClient';
import ArticleReply from './ArticleReply';
import { navigateToScreen } from '../../App';

const ArticleComment = props => {
  const { comment, user } = props;

  const [repliedComments, setRepliedComments] = useState(comment.comments);
  const [showReplies, setShowReplies] = useState(false);
  const [userReply, setUserReply] = useState({
    content: ''
  });

  const isUserCommentAuthor = comment => {
    return user && comment.userId === user.id;
  };

  const onReplyContentChange = e => {
    const value = e.target.value;
    setUserReply({ content: value });
  };

  const onRepliesButtonClick = () => {
    setShowReplies(!showReplies);
    getCommentReplies(comment.id)
      .then(response => {
        if (response && response.data) {
          setRepliedComments(response.data.comments);
        }
      })
      .catch(error => {
        console.log(error);
      })
  };

  const onSubmitReplyButtonClick = e => {
    e.preventDefault();
    createReply(comment.id, userReply)
      .then(response => {
        navigateToScreen('/articles');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const showRepliedComments = () => {
    return (
      <div>
        {
          repliedComments.map(reply => {
            return (
              <ArticleReply 
                key={reply.id}
                isUserCommentAuthor={isUserCommentAuthor}
                reply={reply}
              />
            )
          })
        }
        {
          user &&
            <div className="ui comments">
              <form className="ui form">
                <div className="field">
                  <label>Your Reply</label>
                  <textarea 
                    placeholder="Your reply goes here..." 
                    className="comment-textarea"
                    onChange={onReplyContentChange}
                    value={userReply.content}
                  >
                  </textarea>
                </div>
                <button className="ui secondary mini button" 
                  type="submit" onClick={onSubmitReplyButtonClick}
                >
                  Submit
                </button>
              </form>
            </div>
        }
      </div>
    );
  };

  return (
    <div className="comment">
      <div className="content">
        <span className="author">
          {comment.customUser ? comment.customUser.name : 'NA'}
        </span>
        <div className="metadata">
          <span className="date">{ getFormattedDateText(comment.createdAt) }</span>
          {
            isUserCommentAuthor(comment) &&
              <button className="ui icon mini button">
                <i className="edit icon"></i>
              </button>
          }
        </div>
        <div className="text">
          { comment.content }
        </div>
      </div>
      {
        showReplies && showRepliedComments()
      }
      <button className="ui mini button" onClick={onRepliesButtonClick}>
        {comment.comments.length} Replies
      </button>
      <div className="ui hidden divider"></div>
    </div>
  );
};

export default ArticleComment;