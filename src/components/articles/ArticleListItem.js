import React from 'react';
import { Link } from 'react-router-dom';

import { getFormattedDateText } from '../../utils';

const ArticleListItem = props => {
  const { article } = props;

  return (
    <div className="event mt12">
      <div className="content">
        <div className="summary">
          <Link to={`/articles/${article.id}`}>{article.title}</Link>
          <div className="date">
            { article.customUser.name } on
          </div>
          <div className="date">
            { getFormattedDateText(article.createdAt) }
          </div>
        </div>
        <div className="extra">
          {article.content}
        </div>
        <div className="meta">
          <div className="like">
            { article.comments.length } comments
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleListItem;
