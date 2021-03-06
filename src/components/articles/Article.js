import React, { useState, useEffect } from 'react';

import { getArticle } from '../../actions/ApiClient';
import ArticleComment from './ArticleComment';
import ArticleReplyOrCommentForm from './ArticleReplyOrCommentForm';
import EditCommentOrReplyModal from './EditCommentOrReplyModal';

const Article = function(props) {
  const { user } = props.location;
  const articleId = props.match.params.id; // matched to path={`${matchedPath}/:id`}

  const [article, setArticle] = useState(props.location.article);
  const [editModalData, setEditModalData] = useState({
    visible: false,
    replyOrComment: {}
  });

  useEffect(() => {
    if (!article) {
      // article was not available in props, get it from server
      getArticle(articleId)
        .then(response => {
          if (response && response.data) {
            setArticle(response.data);
          }
        })
        .catch(error => console.log(error));
    }
  }, []);

  const onEditReplyOrCommentClicked = replyOrComment => {
    return e => {
      e.preventDefault();
      setEditModalData({
        visible: true,
        replyOrComment
      });
    }
  };

  const closeEditReplyOrCommentModal = () => {
    setEditModalData({
      visible: false
    });
  };

  const renderArticle = article => {
    return (
      <div>
        <h1 className="ui blue header">{article.title}</h1>
        <p>
          {article.content}
        </p>
        <div className="ui comments">
          <h3 className="ui dividing header">Comments</h3>
          {
            article.comments.map(comment => {
              return <ArticleComment 
                key={comment.id} comment={comment} user={user}
                onEditReplyOrCommentClicked={onEditReplyOrCommentClicked} 
              />
            })
          }
        </div>
        {
          user &&
            <ArticleReplyOrCommentForm article={article} isReply={false} />
        }
      </div>
    );
  };

  return (
    <div>
      <div className="ui basic segment">
        Hello { user ? user.name : 'Guest'}
      </div>
      <div className="ui basic segment">
        {
          article ?
            renderArticle(article)
            :
            <div className="ui active centered inline loader">
            </div>
        }
      </div>
      { 
        editModalData.visible && 
          <EditCommentOrReplyModal 
            replyOrComment={editModalData.replyOrComment} 
            closeModal={closeEditReplyOrCommentModal}
          />
      }
    </div>
  );
};

export default Article;