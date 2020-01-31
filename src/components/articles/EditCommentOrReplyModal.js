import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { patchComment } from '../../actions/ApiClient';
import { navigateToScreen } from '../../App';

const EditCommentOrReplyModal = props => {
  const { closeModal } = props;

  const [replyOrComment, setReplyOrComment] = useState(props.replyOrComment);

  const onReplyOrCommentChange = e => {
    setReplyOrComment({...replyOrComment, content: e.target.value });
  };

  const onSubmitClicked = e => {
    patchComment(replyOrComment.id, replyOrComment)
      .then(response => {
        navigateToScreen('/articles');
      })
      .catch(error => {
        console.log(error);
      });
  };

  // reply will have commentId while comment will have articleId
  const isReply = !!replyOrComment.commentId;

  return (
    <div className="ui dimmer modals page active">
      <div className="ui active modal">
        <div className="header">
          Update your { isReply ? 'reply' : 'comment'}
        </div>
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label>Your {isReply ? 'Reply' : 'Comment'}</label>
              <textarea 
                className="comment-textarea"
                value={replyOrComment.content}
                onChange={onReplyOrCommentChange}
              >
              </textarea>
            </div>
            <button className="ui primary mini button" onClick={onSubmitClicked}>
              Submit
            </button>
            <button className="ui mini button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

EditCommentOrReplyModal.propTypes = {
  replyOrComment: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default EditCommentOrReplyModal;