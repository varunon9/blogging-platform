import React, { useState } from 'react';

import { getFormattedDateText } from '../../utils/';
import { getCommentReplies } from '../../actions/ApiClient';

const ArticleComment = props => {
  const { comment, user } = props;

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
              <div className="ui comments">
                <div className="comment">
                  <div className="content">
                    <a className="author">
                      {reply.customUser ? reply.customUser.name : 'NA'}
                    </a>
                    <div className="metadata">
                      <span className="date">{ getFormattedDateText(reply.createdAt) }</span>
                      {
                        isUserCommentAuthor(reply) &&
                          <button className="ui icon mini button">
                            <i className="edit icon"></i>
                          </button>
                      }
                    </div>
                    <div className="text">
                      { reply.content }
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
        {
          user &&
            <div className="ui comments">
              <form className="ui form">
                <div className="field">
                  <label>Your Reply</label>
                  <textarea placeholder="Your reply goes here..." class="comment-textarea">
                  </textarea>
                </div>
                <button class="ui secondary mini button" type="submit">
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
        <a className="author">
          {comment.customUser ? comment.customUser.name : 'NA'}
        </a>
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