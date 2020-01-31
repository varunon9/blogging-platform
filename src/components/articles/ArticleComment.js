import React, { useState } from 'react';

import { getFormattedDateText } from '../../utils/';
import { getCommentReplies } from '../../actions/ApiClient';
import ArticleReply from './ArticleReply';
import ArticleReplyOrCommentForm from './ArticleReplyOrCommentForm';

const ArticleComment = props => {
  const { comment, user, onEditReplyOrCommentClicked } = props;

  const [repliedComments, setRepliedComments] = useState(comment.comments);
  const [showReplies, setShowReplies] = useState(false);

  const isUserCommentAuthor = comment => {
    return user && comment.userId === user.id;
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
                onEditReplyOrCommentClicked={onEditReplyOrCommentClicked}
              />
            )
          })
        }
        {
          user &&
            <ArticleReplyOrCommentForm comment={comment} isReply />
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
              <button className="ui icon mini button" onClick={onEditReplyOrCommentClicked(comment)}>
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