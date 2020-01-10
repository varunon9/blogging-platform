import React, { useState, useEffect } from 'react';

import { getArticle } from '../../actions/ApiClient';
import ArticleComment from './ArticleComment';

const Article = function(props) {
  const { user } = props.location;
  const articleId = props.match.params.id; // matched to path={`${matchedPath}/:id`}

  const [article, setArticle] = useState(props.location.article);

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
              return <ArticleComment key={comment.id} comment={comment} user={user} />
            })
          }
        </div>
        {
          user &&
            <form className="ui form">
              <div class="field">
                <label>Your Comment</label>
                <textarea placeholder="Start typing your comment..." class="comment-textarea">
                </textarea>
              </div>
              <button className="ui primary mini button" type="submit">
                Submit
              </button>
            </form>
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
    </div>
  );
};

export default Article;