import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { createReply, createArticleComment } from '../../actions/ApiClient';
import { navigateToScreen } from '../../App';

const ArticleReplyOrCommentForm = props => {
  const { comment, isReply, article } = props;

  const [userReplyOrComment, setUserReplyOrComment] = useState({
    content: ''
  });

  const onReplyContentChange = e => {
    const value = e.target.value;
    setUserReplyOrComment({ content: value });
  };

  const onSubmitButtonClick = e => {
    e.preventDefault();
    if (isReply) {
      createReply(comment.id, userReplyOrComment)
        .then(response => {
          navigateToScreen('/articles');
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        createArticleComment(article.id, userReplyOrComment)
          .then(response => {
            navigateToScreen('/articles');
          })
          .catch(error => {
            console.log(error);
          });
      }
  };

  return (
    <div className="ui comments">
      <form className="ui form">
        <div className="field">
          <label>Your {isReply ? 'Reply' : 'Comment'}</label>
          <textarea 
            placeholder={
              isReply ? 'Your reply goes here...' : 'Start typing your comment...'
            }
            className="comment-textarea"
            onChange={onReplyContentChange}
            value={userReplyOrComment.content}
          >
          </textarea>
        </div>
        <button className="ui secondary mini button" 
          type="submit" onClick={onSubmitButtonClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

ArticleReplyOrCommentForm.defaultProps = {
  isReply: false
};

ArticleReplyOrCommentForm.propTypes = {
  comment: PropTypes.object,
  article: PropTypes.object,
  isReply: PropTypes.bool.isRequired
};

export default ArticleReplyOrCommentForm;