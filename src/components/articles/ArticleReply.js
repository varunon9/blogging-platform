import React from 'react';
import PropTypes from 'prop-types';

import { getFormattedDateText } from '../../utils/';

const ArticleReply = props => {
  const { reply, isUserCommentAuthor, onEditReplyClicked } = props;

  return (
    <div className="ui comments" key={reply.id}>
      <div className="comment">
        <div className="content">
          <span className="author">
            {reply.customUser ? reply.customUser.name : 'NA'}
          </span>
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
  );
};

ArticleReply.propTypes = {
  reply: PropTypes.object.isRequired,
  isUserCommentAuthor: PropTypes.func.isRequired,
  onEditReplyClicked: PropTypes.func.isRequired
};

export default ArticleReply;